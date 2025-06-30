import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

// 数据库连接
export async function getDatabase(): Promise<Database> {
  if (db) {
    return db;
  }

  const dbPath = path.join(process.cwd(), 'data', 'contact.db');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // 初始化数据表
  await initializeTables();
  
  return db;
}

// 初始化数据表
async function initializeTables() {
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