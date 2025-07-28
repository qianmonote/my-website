import { sql } from '@vercel/postgres';
import { ContactFormData, ContactQueryParams } from './database';

// Vercel Postgres 数据库操作
export class PostgresDatabase {
  // 初始化数据表
  static async initializeTables() {
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

  // 插入联系表单数据
  static async insertContact(data: Omit<ContactFormData, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const now = new Date().toISOString();
      const result = await sql`
        INSERT INTO contacts (name, phone, email, company, content, created_at, updated_at)
        VALUES (${data.name}, ${data.phone}, ${data.email}, ${data.company || ''}, ${data.content}, ${now}, ${now})
        RETURNING id
      `;
      return result.rows[0];
    } catch (error) {
      console.error('插入联系数据错误:', error);
      throw new Error('插入联系数据失败');
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