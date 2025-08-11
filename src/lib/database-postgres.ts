import { sql } from '@vercel/postgres';
import { ContactFormData, ContactQueryParams } from './database';

// Vercel Postgres 数据库操作
export class PostgresDatabase {
  // 初始化数据表（带重试机制）
  static async initializeTables() {
    return await this.initializeTablesWithRetry();
  }

  // 带重试机制的数据表初始化
  static async initializeTablesWithRetry(maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await this._initializeTablesCore();
        console.log('数据库表初始化成功');
        return;
      } catch (error) {
        console.error(`数据库初始化失败 (尝试 ${i + 1}/${maxRetries}):`, error);
        if (i === maxRetries - 1) {
          console.error('数据库初始化最终失败，已达到最大重试次数');
          throw error;
        }
        // 指数退避重试
        const delay = 1000 * Math.pow(2, i);
        console.log(`等待 ${delay}ms 后重试...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // 核心初始化逻辑
  static async _initializeTablesCore() {
    try {
      // 创建联系表单表
      await sql`
        CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          email VARCHAR(100) NOT NULL,
          company VARCHAR(200),
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      // 创建用户表
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) NOT NULL UNIQUE,
          password VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      // 创建用户会话表
      await sql`
        CREATE TABLE IF NOT EXISTS user_sessions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL,
          username VARCHAR(50) NOT NULL,
          session_token VARCHAR(64) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          expires_at TIMESTAMP NOT NULL,
          ip_address VARCHAR(45),
          user_agent TEXT,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `;
      
      // 创建索引以提高查询性能 - 分别执行每个索引创建语句
      await sql`
        CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token)
      `;
      
      await sql`
        CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id)
      `;
      
      await sql`
        CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at)
      `;

      // 检查是否需要初始化管理员账号
      const adminUser = await sql`
        SELECT * FROM users WHERE username = 'admin' LIMIT 1
      `;
      
      if (adminUser.rows.length === 0) {
        // 初始化默认管理员账号 (用户名: admin, 密码: admin123)
        await sql`
          INSERT INTO users (username, password) VALUES ('admin', 'admin123')
        `;
      }
    } catch (error) {
      console.error('初始化数据表错误:', error);
      throw new Error('初始化数据表失败');
    }
  }

  // 插入联系表单数据（带重试机制）
  static async insertContact(data: Omit<ContactFormData, 'id' | 'created_at' | 'updated_at'>) {
    const maxRetries = 3;
    for (let i = 0; i < maxRetries; i++) {
      try {
        const now = new Date().toISOString();
        console.log('尝试插入联系数据:', { attempt: i + 1, data: { ...data, content: data.content.substring(0, 50) + '...' } });
        
        const result = await sql`
          INSERT INTO contacts (name, phone, email, company, content, created_at, updated_at)
          VALUES (${data.name}, ${data.phone}, ${data.email}, ${data.company || ''}, ${data.content}, ${now}, ${now})
          RETURNING id
        `;
        
        console.log('联系数据插入成功:', { id: result.rows[0].id });
        return result.rows[0];
      } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          const errorCode = error && typeof error === 'object' && 'code' in error ? (error as { code?: string }).code : undefined;
          const errorDetail = error && typeof error === 'object' && 'detail' in error ? (error as { detail?: string }).detail : undefined;
          
          console.error(`插入联系数据失败 (尝试 ${i + 1}/${maxRetries}):`, {
            error: errorMessage,
            code: errorCode,
            detail: errorDetail,
            data: { ...data, content: data.content.substring(0, 50) + '...' }
          });
          
          if (i === maxRetries - 1) {
            console.error('联系数据插入最终失败，已达到最大重试次数');
            throw new Error(`插入联系数据失败: ${errorMessage}`);
          }
        
        // 短暂延迟后重试
        const delay = 500 * (i + 1);
        console.log(`等待 ${delay}ms 后重试插入...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // 查询联系表单数据（分页、搜索）
  static async queryContacts(params: ContactQueryParams) {
    try {
      const {
        page = 1,
        pageSize = 10,
        name = '',
        phone = '',
        email = '',
        company = '',
        startDate = '',
        endDate = ''
      } = params;

      // 构建WHERE条件
      const conditions: string[] = [];
      const values: (string | number)[] = [];
      let paramIndex = 1;

      if (name) {
        conditions.push(`name ILIKE $${paramIndex}`);
        values.push(`%${name}%`);
        paramIndex++;
      }

      if (phone) {
        conditions.push(`phone ILIKE $${paramIndex}`);
        values.push(`%${phone}%`);
        paramIndex++;
      }

      if (email) {
        conditions.push(`email ILIKE $${paramIndex}`);
        values.push(`%${email}%`);
        paramIndex++;
      }

      if (company) {
        conditions.push(`company ILIKE $${paramIndex}`);
        values.push(`%${company}%`);
        paramIndex++;
      }

      if (startDate) {
        conditions.push(`DATE(created_at) >= $${paramIndex}`);
        values.push(startDate);
        paramIndex++;
      }

      if (endDate) {
        conditions.push(`DATE(created_at) <= $${paramIndex}`);
        values.push(endDate);
        paramIndex++;
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      const offset = (page - 1) * pageSize;

      // 查询总数
      const countQuery = `SELECT COUNT(*) as total FROM contacts ${whereClause}`;
      const countResult = await sql.query(countQuery, values);
      const total = parseInt(countResult.rows[0].total);

      // 查询数据
      const dataQuery = `
        SELECT id, name, phone, email, company, content, created_at, updated_at
        FROM contacts
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `;
      
      const dataResult = await sql.query(dataQuery, [...values, pageSize, offset]);

      return {
        list: dataResult.rows,
        pagination: {
          current: page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
          hasNext: page < Math.ceil(total / pageSize),
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error('查询联系数据错误:', error);
      throw new Error('查询联系数据失败');
    }
  }

  // 根据ID查询联系数据
  static async getContactById(id: number) {
    try {
      const result = await sql`
        SELECT * FROM contacts WHERE id = ${id} LIMIT 1
      `;
      return result.rows[0] || null;
    } catch (error) {
      console.error('查询联系数据错误:', error);
      throw new Error('查询联系数据失败');
    }
  }

  // 删除联系数据
  static async deleteContact(id: number) {
    try {
      const result = await sql`
        DELETE FROM contacts WHERE id = ${id}
      `;
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error('删除联系数据错误:', error);
      throw new Error('删除联系数据失败');
    }
  }

  // 用户认证
  static async authenticateUser(username: string, password: string) {
    try {
      const result = await sql`
        SELECT * FROM users WHERE username = ${username} AND password = ${password} LIMIT 1
      `;
      return result.rows[0] || null;
    } catch (error) {
      console.error('用户认证错误:', error);
      throw new Error('用户认证失败');
    }
  }
}