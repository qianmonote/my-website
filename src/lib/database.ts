import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';
import { PostgresDatabase } from './database-postgres';

let db: Database | null = null;

// 检查是否使用 Vercel Postgres
const isVercelPostgres = () => {
  return process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.VERCEL_ENV === 'production';
};

// 确保数据目录存在（仅SQLite需要）
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// 数据库连接（SQLite）
export async function getDatabase(): Promise<Database> {
  try {
    if (db) {
      return db;
    }

    ensureDataDirectory();
    const dbPath = path.join(process.cwd(), 'data', 'contact.db');
    
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // 初始化数据表
    await initializeTables();
    
    return db;
  } catch (error) {
    console.error('数据库连接错误:', error);
    throw new Error('数据库连接失败');
  }
}

// 统一的数据库初始化
export async function initializeDatabase() {
  try {
    const usePostgres = isVercelPostgres();
    console.log('数据库环境检测:', {
      POSTGRES_URL: !!process.env.POSTGRES_URL,
      DATABASE_URL: !!process.env.DATABASE_URL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      usePostgres
    });
    
    if (usePostgres) {
      console.log('使用 Vercel Postgres 数据库');
      await PostgresDatabase.initializeTables();
    } else {
      console.log('使用本地 SQLite 数据库');
      await getDatabase();
    }
  } catch (error) {
    console.error('数据库初始化失败:', error);
    throw error;
  }
}

// 初始化数据表
async function initializeTables() {
  try {
    if (!db) return;

    await db.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        company VARCHAR(200),
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 创建用户表
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 检查是否需要初始化管理员账号
    const adminUser = await db.get('SELECT * FROM users WHERE username = ?', ['admin']);
    if (!adminUser) {
      // 初始化默认管理员账号 (用户名: admin, 密码: admin123)
      await db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        ['admin', 'admin123']
      );
    }
  } catch (error) {
    console.error('初始化数据表错误:', error);
    throw new Error('初始化数据表失败');
  }
}

// 联系表单数据接口
export interface ContactFormData {
  id?: number;
  name: string;
  phone: string;
  email: string;
  company: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

// 查询参数接口
export interface ContactQueryParams {
  page?: number;
  pageSize?: number;
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
}

// 统一的数据库操作接口
export class DatabaseAdapter {
  // 插入联系表单数据
  static async insertContact(data: Omit<ContactFormData, 'id' | 'created_at' | 'updated_at'>) {
    if (isVercelPostgres()) {
      return await PostgresDatabase.insertContact(data);
    } else {
      const db = await getDatabase();
      const result = await db.run(
        'INSERT INTO contacts (name, phone, email, company, content) VALUES (?, ?, ?, ?, ?)',
        [data.name, data.phone, data.email, data.company || '', data.content]
      );
      return { id: result.lastID };
    }
  }

  // 查询联系表单数据（分页、搜索）
  static async queryContacts(params: ContactQueryParams) {
    if (isVercelPostgres()) {
      return await PostgresDatabase.queryContacts(params);
    } else {
      const db = await getDatabase();
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
      
      if (name) {
        conditions.push('name LIKE ?');
        values.push(`%${name}%`);
      }
      
      if (phone) {
        conditions.push('phone LIKE ?');
        values.push(`%${phone}%`);
      }
      
      if (email) {
        conditions.push('email LIKE ?');
        values.push(`%${email}%`);
      }
      
      if (company) {
        conditions.push('company LIKE ?');
        values.push(`%${company}%`);
      }
      
      if (startDate) {
        conditions.push('DATE(created_at) >= ?');
        values.push(startDate);
      }
      
      if (endDate) {
        conditions.push('DATE(created_at) <= ?');
        values.push(endDate);
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      const offset = (page - 1) * pageSize;

      // 查询总数
      const countResult = await db.get(
        `SELECT COUNT(*) as total FROM contacts ${whereClause}`,
        values
      );
      const total = countResult?.total || 0;

      // 查询数据
      const list = await db.all(
        `SELECT id, name, phone, email, company, content, created_at, updated_at
         FROM contacts
         ${whereClause}
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`,
        [...values, pageSize, offset]
      );

      return {
        list,
        pagination: {
          current: page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
          hasNext: page < Math.ceil(total / pageSize),
          hasPrev: page > 1
        }
      };
    }
  }

  // 根据ID查询联系数据
  static async getContactById(id: number) {
    if (isVercelPostgres()) {
      return await PostgresDatabase.getContactById(id);
    } else {
      const db = await getDatabase();
      return await db.get('SELECT * FROM contacts WHERE id = ?', [id]);
    }
  }

  // 删除联系数据
  static async deleteContact(id: number) {
    if (isVercelPostgres()) {
      return await PostgresDatabase.deleteContact(id);
    } else {
      const db = await getDatabase();
      const result = await db.run('DELETE FROM contacts WHERE id = ?', [id]);
      return (result.changes || 0) > 0;
    }
  }

  // 用户认证
  static async authenticateUser(username: string, password: string) {
    if (isVercelPostgres()) {
      return await PostgresDatabase.authenticateUser(username, password);
    } else {
      const db = await getDatabase();
      return await db.get(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password]
      );
    }
  }
}