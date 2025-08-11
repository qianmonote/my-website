#!/usr/bin/env node

/**
 * 数据库连接问题快速修复脚本
 * 用于诊断和修复线上数据库连接失败问题
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 开始诊断数据库连接问题...');
console.log('=' .repeat(50));

// 1. 检查本地环境
console.log('\n📋 1. 检查本地环境');
try {
  const dataDir = path.join(process.cwd(), 'data');
  const dbFile = path.join(dataDir, 'contact.db');
  
  if (fs.existsSync(dbFile)) {
    const stats = fs.statSync(dbFile);
    console.log('✅ 本地 SQLite 数据库存在');
    console.log(`   文件大小: ${stats.size} bytes`);
    console.log(`   最后修改: ${stats.mtime.toLocaleString()}`);
  } else {
    console.log('❌ 本地 SQLite 数据库不存在');
  }
} catch (error) {
  console.log('❌ 检查本地数据库时出错:', error.message);
}

// 2. 检查环境变量
console.log('\n🔧 2. 检查环境变量配置');
const envVars = {
  'POSTGRES_URL': process.env.POSTGRES_URL,
  'DATABASE_URL': process.env.DATABASE_URL,
  'VERCEL_ENV': process.env.VERCEL_ENV,
  'NODE_ENV': process.env.NODE_ENV
};

for (const [key, value] of Object.entries(envVars)) {
  if (value) {
    console.log(`✅ ${key}: ${key.includes('URL') ? '[已设置]' : value}`);
  } else {
    console.log(`❌ ${key}: 未设置`);
  }
}

// 3. 检查依赖包
console.log('\n📦 3. 检查数据库相关依赖');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const dbDeps = {
    '@vercel/postgres': deps['@vercel/postgres'],
    'sqlite3': deps['sqlite3'],
    'sqlite': deps['sqlite']
  };
  
  for (const [pkg, version] of Object.entries(dbDeps)) {
    if (version) {
      console.log(`✅ ${pkg}: ${version}`);
    } else {
      console.log(`❌ ${pkg}: 未安装`);
    }
  }
} catch (error) {
  console.log('❌ 检查依赖时出错:', error.message);
}

// 4. 检查 Git 状态
console.log('\n📝 4. 检查 Git 状态');
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    console.log('⚠️  有未提交的更改:');
    console.log(gitStatus);
  } else {
    console.log('✅ 工作目录干净，无未提交更改');
  }
  
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  console.log(`📍 当前分支: ${currentBranch}`);
  
  const lastCommit = execSync('git log -1 --oneline', { encoding: 'utf8' }).trim();
  console.log(`📝 最后提交: ${lastCommit}`);
} catch (error) {
  console.log('❌ 检查 Git 状态时出错:', error.message);
}

// 5. 生成修复建议
console.log('\n🛠️  5. 修复建议');
console.log('=' .repeat(50));

const hasPostgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

if (!hasPostgresUrl && isProduction) {
  console.log('🚨 问题：生产环境缺少数据库连接字符串');
  console.log('\n解决方案：');
  console.log('1. 登录 Vercel Dashboard');
  console.log('2. 检查项目的环境变量设置');
  console.log('3. 确认 DATABASE_URL 或 POSTGRES_URL 已正确配置');
  console.log('4. 重新部署应用');
} else if (!hasPostgresUrl && !isProduction) {
  console.log('ℹ️  本地开发环境，将使用 SQLite 数据库');
  console.log('\n如需测试 Postgres 连接，请设置环境变量：');
  console.log('export DATABASE_URL="your_postgres_connection_string"');
} else {
  console.log('✅ 环境配置看起来正常');
}

console.log('\n📋 通用修复步骤：');
console.log('1. 确保所有更改已提交并推送到远程仓库');
console.log('2. 在 Vercel Dashboard 中重新部署应用');
console.log('3. 检查部署日志中的数据库连接信息');
console.log('4. 测试 API 接口是否恢复正常');

// 6. 提供快速修复命令
console.log('\n⚡ 6. 快速修复命令');
console.log('=' .repeat(50));
console.log('\n# 强制重新部署（如果有未推送的更改）');
console.log('git add .');
console.log('git commit -m "Fix: database connection issue"');
console.log('git push origin main');
console.log('\n# 或者空提交触发重新部署');
console.log('git commit --allow-empty -m "Force redeploy to fix database connection"');
console.log('git push origin main');

console.log('\n# 本地测试数据库连接');
console.log('npm run dev');
console.log('# 然后在另一个终端测试 API:');
console.log('curl -X POST http://localhost:3000/api/contact/list -H "Content-Type: application/json" -d \'{"page": 1, "pageSize": 10}\'');

console.log('\n🔗 相关文档：');
console.log('- 数据库修复指南: ./doc/DATABASE_FIX_GUIDE.md');
console.log('- Vercel Postgres 配置: ./doc/VERCEL_POSTGRES_README.md');
console.log('- 问题诊断文档: ./TROUBLESHOOTING_DATABASE_CONNECTION.md');

console.log('\n✨ 诊断完成！请根据上述建议进行修复。');