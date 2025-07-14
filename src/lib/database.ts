import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';

let db: Database | null = null;

// 确保数据目录存在
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// 数据库连接
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