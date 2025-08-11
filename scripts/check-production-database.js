#!/usr/bin/env node

/**
 * 生产环境数据库连接检查脚本
 * 用于检测 Vercel Postgres 自动检测和连接状态
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔍 检查生产环境数据库连接状态...');
console.log('=' .repeat(60));

// 1. 检查当前环境
console.log('\n📋 1. 当前环境信息');
console.log('-'.repeat(30));
const envInfo = {
  'NODE_ENV': process.env.NODE_ENV || '未设置',
  'VERCEL_ENV': process.env.VERCEL_ENV || '未设置',
  'POSTGRES_URL': process.env.POSTGRES_URL ? '[已设置]' : '未设置',
  'DATABASE_URL': process.env.DATABASE_URL ? '[已设置]' : '未设置',
  'DATABASE_URL_UNPOOLED': process.env.DATABASE_URL_UNPOOLED ? '[已设置]' : '未设置',
  'POSTGRES_PRISMA_URL': process.env.POSTGRES_PRISMA_URL ? '[已设置]' : '未设置'
};

for (const [key, value] of Object.entries(envInfo)) {
  const status = value === '未设置' ? '❌' : '✅';
  console.log(`${status} ${key}: ${value}`);
}

// 2. 模拟环境检测逻辑
console.log('\n🔧 2. 数据库环境检测逻辑');
console.log('-'.repeat(30));
const hasPostgresUrl = !!(process.env.POSTGRES_URL || process.env.DATABASE_URL);
const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
const shouldUsePostgres = hasPostgresUrl || process.env.VERCEL_ENV === 'production';

console.log(`检测结果:`);
console.log(`  - 有 Postgres 连接字符串: ${hasPostgresUrl ? '✅' : '❌'}`);
console.log(`  - 是生产环境: ${isProduction ? '✅' : '❌'}`);
console.log(`  - 应使用 Postgres: ${shouldUsePostgres ? '✅' : '❌'}`);

if (shouldUsePostgres && !hasPostgresUrl) {
  console.log('\n⚠️  警告: 生产环境但缺少数据库连接字符串!');
}

// 3. 检查项目配置
console.log('\n📦 3. 项目配置检查');
console.log('-'.repeat(30));
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = packageJson.dependencies || {};
  
  const dbDeps = {
    '@vercel/postgres': dependencies['@vercel/postgres'],
    'sqlite3': dependencies['sqlite3'],
    'sqlite': dependencies['sqlite']
  };
  
  console.log('数据库相关依赖:');
  for (const [dep, version] of Object.entries(dbDeps)) {
    if (version) {
      console.log(`  ✅ ${dep}: ${version}`);
    } else {
      console.log(`  ❌ ${dep}: 未安装`);
    }
  }
} catch (error) {
  console.log('❌ 无法读取 package.json:', error.message);
}

// 4. 测试本地 API 接口
console.log('\n🧪 4. 本地 API 接口测试');
console.log('-'.repeat(30));
try {
  console.log('测试 POST /api/contact/list...');
  const result = execSync(
    'curl -s -X POST http://localhost:3000/api/contact/list -H "Content-Type: application/json" -d \'{"page": 1, "pageSize": 5}\'',
    { encoding: 'utf8', timeout: 10000 }
  );
  
  try {
    const response = JSON.parse(result);
    if (response.flag === 1) {
      console.log('✅ API 接口响应正常');
      console.log(`   返回数据: ${JSON.stringify(response.data.pagination)}`);
    } else {
      console.log('❌ API 接口返回错误:', response.msg);
    }
  } catch {
    console.log('❌ API 响应格式错误:', result.substring(0, 200));
  }
} catch (error) {
  console.log('❌ 无法连接本地服务器 (确保 npm run dev 正在运行)');
  console.log('   错误:', error.message);
}

// 5. 生产环境检查建议
console.log('\n🚀 5. 生产环境检查建议');
console.log('-'.repeat(30));

if (!hasPostgresUrl && isProduction) {
  console.log('🚨 关键问题: 生产环境缺少数据库连接');
  console.log('\n立即修复步骤:');
  console.log('1. 登录 Vercel Dashboard: https://vercel.com/dashboard');
  console.log('2. 进入项目 → Storage → 检查 Postgres 数据库状态');
  console.log('3. 进入项目 → Settings → Environment Variables');
  console.log('4. 确认以下变量存在:');
  console.log('   - DATABASE_URL');
  console.log('   - DATABASE_URL_UNPOOLED (可选)');
  console.log('   - POSTGRES_URL (可选)');
  console.log('5. 如果变量缺失，重新连接数据库或手动添加');
  console.log('6. 重新部署应用');
} else if (hasPostgresUrl) {
  console.log('✅ 数据库配置看起来正常');
  console.log('\n如果仍有问题，检查:');
  console.log('1. Vercel 部署日志中的数据库连接信息');
  console.log('2. 数据库实例是否处于活跃状态');
  console.log('3. 网络连接是否正常');
} else {
  console.log('ℹ️  当前为本地开发环境');
  console.log('\n生产环境部署前确保:');
  console.log('1. 在 Vercel 中创建 Postgres 数据库');
  console.log('2. 环境变量会自动配置');
  console.log('3. 推送代码触发部署');
}

// 6. 快速修复命令
console.log('\n⚡ 6. 快速修复命令');
console.log('-'.repeat(30));
console.log('\n# 检查 Git 状态');
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    console.log('⚠️  有未提交的更改:');
    console.log(gitStatus);
    console.log('\n# 提交并部署');
    console.log('git add .');
    console.log('git commit -m "Fix: check and fix database connection"');
    console.log('git push origin main');
  } else {
    console.log('✅ 没有未提交的更改');
    console.log('\n# 强制重新部署');
    console.log('git commit --allow-empty -m "Force redeploy to check database connection"');
    console.log('git push origin main');
  }
} catch (error) {
  console.log('❌ 无法检查 Git 状态:', error.message);
}

console.log('\n# 监控部署状态');
console.log('# 1. 在 Vercel Dashboard 查看部署日志');
console.log('# 2. 查找数据库环境检测日志');
console.log('# 3. 测试生产环境 API:');
console.log('#    curl -X POST https://www.qianmonote.online/api/contact/list \\');
console.log('#      -H "Content-Type: application/json" \\');
console.log('#      -d \'{"page": 1, "pageSize": 5}\'');

// 7. 相关文档
console.log('\n📚 7. 相关文档');
console.log('-'.repeat(30));
console.log('- 数据库修复指南: ./doc/DATABASE_FIX_GUIDE.md');
console.log('- 问题诊断文档: ./TROUBLESHOOTING_DATABASE_CONNECTION.md');
console.log('- Vercel Postgres 配置: ./doc/VERCEL_POSTGRES_README.md');

console.log('\n✨ 检查完成！');
console.log('\n如果问题持续存在，请:');
console.log('1. 检查 Vercel 部署日志');
console.log('2. 确认数据库实例状态');
console.log('3. 联系技术支持并提供上述检查结果');