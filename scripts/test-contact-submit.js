#!/usr/bin/env node

/**
 * 联系表单提交API测试脚本
 * 用于诊断 /api/contact/submit 端点的500错误
 */

import { execSync } from 'child_process';

// 配置
const CONFIG = {
  PRODUCTION_URL: process.env.PRODUCTION_URL || 'https://your-domain.com',
  LOCAL_URL: 'http://localhost:3000',
  TIMEOUT: parseInt(process.env.TIMEOUT) || 10000,
  MAX_RETRIES: parseInt(process.env.MAX_RETRIES) || 3
};

// 测试数据
const TEST_DATA = {
  valid: {
    name: "测试用户",
    phone: "13800138000",
    email: "test@example.com",
    company: "测试公司",
    content: "这是一条测试消息"
  },
  invalidEmail: {
    name: "测试用户",
    phone: "13800138000",
    email: "invalid-email",
    company: "测试公司",
    content: "测试无效邮箱"
  },
  invalidPhone: {
    name: "测试用户",
    phone: "123",
    email: "test@example.com",
    company: "测试公司",
    content: "测试无效手机号"
  },
  empty: {
    name: "",
    phone: "",
    email: "",
    company: "",
    content: ""
  }
};

// HTTP请求函数
function makeRequest(url, data) {
  try {
    const curlCommand = [
      'curl',
      '-s',
      '-w', '"\n%{http_code}"',
      '-X', 'POST',
      '-H', '"Content-Type: application/json"',
      '-H', '"User-Agent: ContactSubmitTest/1.0"',
      '--connect-timeout', '10',
      '--max-time', '30',
      '-d', `'${JSON.stringify(data)}'`,
      url
    ].join(' ');

    const result = execSync(curlCommand, { 
      encoding: 'utf8',
      timeout: CONFIG.TIMEOUT 
    });
    
    const lines = result.trim().split('\n');
    const statusCode = lines[lines.length - 1];
    const responseBody = lines.slice(0, -1).join('\n');
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseBody);
    } catch {
      parsedResponse = { raw: responseBody };
    }
    
    return {
      statusCode: parseInt(statusCode),
      response: parsedResponse,
      success: parseInt(statusCode) >= 200 && parseInt(statusCode) < 300
    };
  } catch (error) {
    return {
      statusCode: 0,
      response: { error: error.message },
      success: false
    };
  }
}

// 测试单个端点
async function testEndpoint(url, testName, testData) {
  console.log(`\n🧪 测试: ${testName}`);
  console.log(`📍 URL: ${url}/api/contact/submit`);
  console.log(`📝 数据: ${JSON.stringify(testData, null, 2)}`);
  
  const result = makeRequest(`${url}/api/contact/submit`, testData);
  
  console.log(`📊 状态码: ${result.statusCode}`);
  console.log(`📋 响应: ${JSON.stringify(result.response, null, 2)}`);
  
  if (result.statusCode === 500) {
    console.log('🚨 发现500错误！');
    
    // 分析可能的原因
    if (result.response.msg) {
      console.log(`   错误消息: ${result.response.msg}`);
    }
    
    if (result.response.msg === '数据库连接失败，请稍后重试') {
      console.log('   🔍 可能原因: 数据库初始化失败');
    } else if (result.response.msg === '保存数据失败，请稍后重试') {
      console.log('   🔍 可能原因: 数据插入失败');
    } else if (result.response.msg === '服务器错误，请稍后重试') {
      console.log('   🔍 可能原因: 未捕获的异常');
    }
  }
  
  return result;
}

// 测试健康检查端点
async function testHealthEndpoint(url) {
  console.log(`\n🏥 健康检查: ${url}/api/health`);
  
  const result = makeRequest(`${url}/api/health`, {});
  
  if (result.success && result.response.status === 'healthy') {
    console.log('✅ 健康检查通过');
    console.log(`   数据库类型: ${result.response.database.type}`);
    console.log(`   数据库连接: ${result.response.database.connected ? '正常' : '失败'}`);
    
    if (result.response.database.error) {
      console.log(`   数据库错误: ${result.response.database.error}`);
    }
  } else {
    console.log('❌ 健康检查失败');
    console.log(`   状态码: ${result.statusCode}`);
    console.log(`   响应: ${JSON.stringify(result.response, null, 2)}`);
  }
  
  return result;
}

// 主测试函数
async function runTests() {
  console.log('🚀 联系表单提交API测试开始');
  console.log('=' .repeat(60));
  
  const args = process.argv.slice(2);
  const testLocal = args.includes('--local') || args.includes('-l');
  const testProduction = args.includes('--production') || args.includes('-p');
  const testAll = !testLocal && !testProduction;
  
  let hasErrors = false;
  
  // 测试本地环境
  if (testLocal || testAll) {
    console.log('\n🏠 本地环境测试');
    console.log('-'.repeat(30));
    
    // 检查本地服务器是否运行
    const localHealth = await testHealthEndpoint(CONFIG.LOCAL_URL);
    
    if (localHealth.success) {
      // 测试各种情况
      const localResults = {
        valid: await testEndpoint(CONFIG.LOCAL_URL, '有效数据', TEST_DATA.valid),
        invalidEmail: await testEndpoint(CONFIG.LOCAL_URL, '无效邮箱', TEST_DATA.invalidEmail),
        invalidPhone: await testEndpoint(CONFIG.LOCAL_URL, '无效手机号', TEST_DATA.invalidPhone),
        empty: await testEndpoint(CONFIG.LOCAL_URL, '空数据', TEST_DATA.empty)
      };
      
      // 统计本地测试结果
      const localErrors = Object.values(localResults).filter(r => r.statusCode === 500);
      if (localErrors.length > 0) {
        console.log(`\n🚨 本地环境发现 ${localErrors.length} 个500错误`);
        hasErrors = true;
      } else {
        console.log('\n✅ 本地环境测试通过');
      }
    } else {
      console.log('❌ 本地服务器未运行或健康检查失败');
      console.log('   请先运行: npm run dev');
    }
  }
  
  // 测试生产环境
  if (testProduction || testAll) {
    console.log('\n🌐 生产环境测试');
    console.log('-'.repeat(30));
    
    if (CONFIG.PRODUCTION_URL === 'https://your-domain.com') {
      console.log('⚠️  请设置 PRODUCTION_URL 环境变量');
      console.log('   例如: PRODUCTION_URL=https://your-actual-domain.com node scripts/test-contact-submit.js');
    } else {
      // 检查生产环境健康状态
      await testHealthEndpoint(CONFIG.PRODUCTION_URL);
      
      // 测试各种情况
      const prodResults = {
        valid: await testEndpoint(CONFIG.PRODUCTION_URL, '有效数据', TEST_DATA.valid),
        invalidEmail: await testEndpoint(CONFIG.PRODUCTION_URL, '无效邮箱', TEST_DATA.invalidEmail),
        invalidPhone: await testEndpoint(CONFIG.PRODUCTION_URL, '无效手机号', TEST_DATA.invalidPhone),
        empty: await testEndpoint(CONFIG.PRODUCTION_URL, '空数据', TEST_DATA.empty)
      };
      
      // 统计生产环境测试结果
      const prodErrors = Object.values(prodResults).filter(r => r.statusCode === 500);
      if (prodErrors.length > 0) {
        console.log(`\n🚨 生产环境发现 ${prodErrors.length} 个500错误`);
        hasErrors = true;
        
        // 提供修复建议
        console.log('\n🔧 修复建议:');
        console.log('1. 检查 Vercel 部署日志');
        console.log('2. 确认数据库连接配置');
        console.log('3. 检查环境变量设置');
        console.log('4. 运行健康检查: curl https://your-domain.com/api/health');
      } else {
        console.log('\n✅ 生产环境测试通过');
      }
    }
  }
  
  // 总结
  console.log('\n' + '='.repeat(60));
  if (hasErrors) {
    console.log('❌ 测试完成，发现错误');
    console.log('\n📚 相关文档:');
    console.log('- 生产环境验证指南: ./PRODUCTION_DATABASE_VERIFICATION.md');
    console.log('- 数据库连接问题: ./TROUBLESHOOTING_DATABASE_CONNECTION.md');
    process.exit(1);
  } else {
    console.log('✅ 所有测试通过');
  }
}

// 显示使用说明
function showUsage() {
  console.log('联系表单提交API测试工具');
  console.log('\n用法:');
  console.log('  node scripts/test-contact-submit.js [选项]');
  console.log('\n选项:');
  console.log('  --local, -l      仅测试本地环境');
  console.log('  --production, -p 仅测试生产环境');
  console.log('  --help, -h       显示此帮助信息');
  console.log('\n环境变量:');
  console.log('  PRODUCTION_URL   生产环境URL (默认: https://your-domain.com)');
  console.log('  TIMEOUT          请求超时时间 (默认: 10000ms)');
  console.log('  MAX_RETRIES      最大重试次数 (默认: 3)');
  console.log('\n示例:');
  console.log('  # 测试本地环境');
  console.log('  node scripts/test-contact-submit.js --local');
  console.log('\n  # 测试生产环境');
  console.log('  PRODUCTION_URL=https://your-domain.com node scripts/test-contact-submit.js --production');
  console.log('\n  # 测试所有环境');
  console.log('  PRODUCTION_URL=https://your-domain.com node scripts/test-contact-submit.js');
}

// 主程序
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showUsage();
} else {
  runTests().catch(error => {
    console.error('❌ 测试执行失败:', error.message);
    process.exit(1);
  });
}