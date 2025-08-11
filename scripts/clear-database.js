#!/usr/bin/env node

/**
 * 数据库数据清除脚本
 * 用于清除数据库中的所有数据（保留表结构）
 */

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function clearDatabase() {
  console.log('🗑️  开始清除数据库数据...');
  console.log('=' .repeat(50));

  try {
    // 数据库文件路径
    const dbPath = path.join(process.cwd(), 'data', 'contact.db');
    
    // 检查数据库文件是否存在
    if (!fs.existsSync(dbPath)) {
      console.log('❌ 数据库文件不存在:', dbPath);
      return;
    }

    console.log('📍 数据库文件路径:', dbPath);

    // 连接数据库
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    console.log('✅ 数据库连接成功');

    // 查询现有数据数量
    const contactCount = await db.get('SELECT COUNT(*) as count FROM contacts');
    const sessionCount = await db.get('SELECT COUNT(*) as count FROM user_sessions');
    
    console.log(`📊 当前数据统计:`);
    console.log(`   - contacts 表: ${contactCount.count} 条记录`);
    console.log(`   - user_sessions 表: ${sessionCount.count} 条记录`);

    if (contactCount.count === 0 && sessionCount.count === 0) {
      console.log('ℹ️  数据库已经是空的，无需清除');
      await db.close();
      return;
    }

    // 确认清除操作
    console.log('\n⚠️  警告: 此操作将删除所有数据，且不可恢复！');
    console.log('如果确认要继续，请在5秒内按 Ctrl+C 取消...');
    
    // 等待5秒
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('\n🧹 开始清除数据...');

    // 清除 contacts 表数据
    await db.run('DELETE FROM contacts');
    console.log('✅ contacts 表数据已清除');

    // 清除 user_sessions 表数据
    await db.run('DELETE FROM user_sessions');
    console.log('✅ user_sessions 表数据已清除');

    // 重置自增ID（SQLite）
    await db.run('DELETE FROM sqlite_sequence WHERE name IN ("contacts", "user_sessions")');
    console.log('✅ 自增ID已重置');

    // 验证清除结果
    const newContactCount = await db.get('SELECT COUNT(*) as count FROM contacts');
    const newSessionCount = await db.get('SELECT COUNT(*) as count FROM user_sessions');
    
    console.log('\n📊 清除后数据统计:');
    console.log(`   - contacts 表: ${newContactCount.count} 条记录`);
    console.log(`   - user_sessions 表: ${newSessionCount.count} 条记录`);

    await db.close();
    console.log('\n🎉 数据库数据清除完成！');
    
  } catch (error) {
    console.error('❌ 清除数据库数据时发生错误:', error);
    process.exit(1);
  }
}

// 处理 Ctrl+C 中断
process.on('SIGINT', () => {
  console.log('\n❌ 操作已取消');
  process.exit(0);
});

// 执行清除操作
clearDatabase();