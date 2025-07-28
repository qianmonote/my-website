import { getDatabase } from './database';

export async function initSessionsTable() {
  const db = await getDatabase();
  
  // 创建用户会话表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      username TEXT NOT NULL,
      session_token TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL,
      ip_address TEXT,
      user_agent TEXT
    );
    
    CREATE INDEX IF NOT EXISTS idx_session_token ON user_sessions(session_token);
    CREATE INDEX IF NOT EXISTS idx_user_id ON user_sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_expires_at ON user_sessions(expires_at);
  `);
  
  console.log('用户会话表初始化完成');
}

// 清理过期的会话
export async function cleanExpiredSessions() {
  const db = await getDatabase();
  await db.run('DELETE FROM user_sessions WHERE expires_at < datetime("now")');
}