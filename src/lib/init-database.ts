import { getDatabase } from './database';
import { initSessionsTable } from './init-sessions-table';

export async function initDatabase() {
  try {
    const db = await getDatabase();
    
    // 创建用户表（如果不存在）
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // 初始化会话表
    await initSessionsTable();
    
    // 检查是否有默认管理员账户，如果没有则创建
    const adminUser = await db.get('SELECT * FROM users WHERE username = ?', ['admin']);
    
    if (!adminUser) {
      await db.run(
        'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
        ['admin', 'admin123', 'admin@example.com']
      );
      console.log('默认管理员账户已创建: admin/admin123');
    }
    
    console.log('数据库初始化完成');
  } catch (error) {
    console.error('数据库初始化失败:', error);
    throw error;
  }
}