#!/usr/bin/env node

/**
 * 生产环境数据库连接修复验证脚本
 * 用于测试修复后的API接口是否正常工作
 */

import https from 'https';
import http from 'http';

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Production-Fix-Test/1.0',
        ...options.headers
      }
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData, headers: res.headers });
        } catch {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

async function testHealthEndpoint(baseUrl) {
  log('\n🔍 测试健康检查端点...', 'cyan');
  try {
    const response = await makeRequest(`${baseUrl}/api/health`);
    
    if (response.status === 200) {
      log('✅ 健康检查通过', 'green');
      log(`   状态: ${response.data.status}`);
      log(`   数据库类型: ${response.data.database?.type}`);
      log(`   数据库连接: ${response.data.database?.connected ? '成功' : '失败'}`);
      log(`   环境: ${response.data.environment?.NODE_ENV}`);
      return true;
    } else {
      log(`❌ 健康检查失败: HTTP ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ 健康检查错误: ${error.message}`, 'red');
    return false;
  }
}

async function testContactSubmit(baseUrl, testData) {
  log(`\n📝 测试联系表单提交: ${testData.name}...`, 'cyan');
  try {
    const response = await makeRequest(`${baseUrl}/api/contact/submit`, {
      method: 'POST',
      body: testData.data
    });
    
    log(`   HTTP状态: ${response.status}`);
    log(`   响应: ${JSON.stringify(response.data, null, 2)}`);
    
    if (response.status === 200 && response.data.flag === 1) {
      log(`✅ ${testData.name} - 成功`, 'green');
      return true;
    } else if (response.status === 200 && response.data.flag === 0) {
      log(`⚠️  ${testData.name} - 业务逻辑错误: ${response.data.msg}`, 'yellow');
      return testData.expectError || false;
    } else {
      log(`❌ ${testData.name} - 失败: HTTP ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ ${testData.name} - 错误: ${error.message}`, 'red');
    return false;
  }
}

async function runTests(baseUrl) {
  log('🚀 开始生产环境修复验证测试', 'blue');
  log(`📍 测试目标: ${baseUrl}`);
  
  const results = {
    health: false,
    validSubmit: false,
    invalidEmail: false,
    invalidPhone: false,
    emptyData: false
  };
  
  // 1. 健康检查
  results.health = await testHealthEndpoint(baseUrl);
  
  // 2. 有效数据提交
  results.validSubmit = await testContactSubmit(baseUrl, {
    name: '有效数据测试',
    data: {
      name: '张三',
      phone: '13800138000',
      email: 'zhangsan@example.com',
      company: '测试公司',
      content: '这是一个数据库连接修复后的测试提交'
    }
  });
  
  // 3. 无效邮箱测试
  results.invalidEmail = await testContactSubmit(baseUrl, {
    name: '无效邮箱测试',
    expectError: true,
    data: {
      name: '李四',
      phone: '13900139000',
      email: 'invalid-email',
      company: '测试公司',
      content: '测试无效邮箱'
    }
  });
  
  // 4. 无效手机号测试
  results.invalidPhone = await testContactSubmit(baseUrl, {
    name: '无效手机号测试',
    expectError: true,
    data: {
      name: '王五',
      phone: '123',
      email: 'wangwu@example.com',
      company: '测试公司',
      content: '测试无效手机号'
    }
  });
  
  // 5. 空数据测试
  results.emptyData = await testContactSubmit(baseUrl, {
    name: '空数据测试',
    expectError: true,
    data: {
      name: '',
      phone: '',
      email: '',
      company: '',
      content: ''
    }
  });
  
  // 生成测试报告
  log('\n📊 测试结果汇总', 'blue');
  log('=' .repeat(50));
  
  const testItems = [
    { name: '健康检查', key: 'health', critical: true },
    { name: '有效数据提交', key: 'validSubmit', critical: true },
    { name: '无效邮箱处理', key: 'invalidEmail', critical: false },
    { name: '无效手机号处理', key: 'invalidPhone', critical: false },
    { name: '空数据处理', key: 'emptyData', critical: false }
  ];
  
  let passedTests = 0;
  let criticalIssues = 0;
  
  testItems.forEach(item => {
    const status = results[item.key];
    const icon = status ? '✅' : '❌';
    const color = status ? 'green' : 'red';
    
    log(`${icon} ${item.name}: ${status ? '通过' : '失败'}`, color);
    
    if (status) passedTests++;
    if (!status && item.critical) criticalIssues++;
  });
  
  log('\n📈 总体评估', 'blue');
  log(`通过测试: ${passedTests}/${testItems.length}`);
  log(`关键问题: ${criticalIssues}`);
  
  if (criticalIssues === 0) {
    log('\n🎉 修复验证成功！生产环境数据库连接问题已解决', 'green');
    log('✨ 建议继续监控生产环境日志以确保稳定性', 'cyan');
  } else {
    log('\n⚠️  仍存在关键问题，需要进一步排查', 'yellow');
    log('💡 建议检查:', 'cyan');
    log('   1. Vercel 环境变量配置');
    log('   2. PostgreSQL 数据库实例状态');
    log('   3. 部署日志中的错误信息');
  }
  
  return criticalIssues === 0;
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  let baseUrl = args[0];
  
  if (!baseUrl) {
    baseUrl = process.env.PRODUCTION_URL;
  }
  
  if (!baseUrl) {
    log('❌ 请提供生产环境URL:', 'red');
    log('   node scripts/test-production-fix.js https://your-domain.com');
    log('   或设置环境变量: PRODUCTION_URL=https://your-domain.com');
    process.exit(1);
  }
  
  // 移除末尾的斜杠
  baseUrl = baseUrl.replace(/\/$/, '');
  
  try {
    const success = await runTests(baseUrl);
    process.exit(success ? 0 : 1);
  } catch (error) {
    log(`\n💥 测试执行失败: ${error.message}`, 'red');
    process.exit(1);
  }
}

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  log(`\n💥 未捕获异常: ${error.message}`, 'red');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  log(`\n💥 未处理的Promise拒绝: ${reason}`, 'red');
  process.exit(1);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { runTests, testHealthEndpoint, testContactSubmit };