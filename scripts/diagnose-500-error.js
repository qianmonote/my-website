#!/usr/bin/env node

/**
 * 诊断 /api/contact/submit 500错误的专用脚本
 * 分析生产环境中可能导致500错误的各种原因
 */

import { execSync } from 'child_process';

// 配置
const CONFIG = {
  PRODUCTION_URL: process.env.PRODUCTION_URL || 'https://your-domain.com',
  LOCAL_URL: 'http://localhost:3000',
  TIMEOUT: 30000
};

// HTTP请求函数
function makeRequest(url, method = 'GET', data = null) {
  try {
    let curlCommand = [
      'curl',
      '-s',
      '-w', '"\n%{http_code}\n%{time_total}"',
      '-X', method,
      '-H', '"Content-Type: application/json"',
      '-H', '"User-Agent: DiagnosticTool/1.0"',
      '--connect-timeout', '10',
      '--max-time', '30'
    ];

    if (data) {
      curlCommand.push('-d', `'${JSON.stringify(data)}'`);
    }

    curlCommand.push(url);

    const result = execSync(curlCommand.join(' '), { 
      encoding: 'utf8',
      timeout: CONFIG.TIMEOUT 
    });
    
    const lines = result.trim().split('\n');
    const responseTime = parseFloat(lines[lines.length - 1]);
    const statusCode = parseInt(lines[lines.length - 2]);
    const responseBody = lines.slice(0, -2).join('\n');
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseBody);
    } catch {
      parsedResponse = { raw: responseBody };
    }
    
    return {
      statusCode,
      response: parsedResponse,
      responseTime,
      success: statusCode >= 200 && statusCode < 300
    };
  } catch (error) {
    return {
      statusCode: 0,
      response: { error: error.message },
      responseTime: 0,
      success: false
    };
  }
}

// 诊断步骤1: 检查健康状态
async function checkHealth(url) {
  console.log(`\n🏥 步骤1: 检查健康状态`);
  console.log(`📍 URL: ${url}/api/health`);
  
  const result = makeRequest(`${url}/api/health`);
  
  console.log(`📊 状态码: ${result.statusCode}`);
  console.log(`⏱️  响应时间: ${result.responseTime}s`);
  
  if (result.success && result.response.status === 'healthy') {
    console.log('✅ 健康检查通过');
    console.log(`   环境: ${result.response.environment?.NODE_ENV || 'unknown'}`);
    console.log(`   数据库类型: ${result.response.database?.type || 'unknown'}`);
    console.log(`   数据库连接: ${result.response.database?.connected ? '正常' : '失败'}`);
    
    if (result.response.database?.error) {
      console.log(`   ⚠️  数据库错误: ${result.response.database.error}`);
    }
    
    return { healthy: true, dbType: result.response.database?.type, dbConnected: result.response.database?.connected };
  } else {
    console.log('❌ 健康检查失败');
    console.log(`   响应: ${JSON.stringify(result.response, null, 2)}`);
    return { healthy: false, dbType: null, dbConnected: false };
  }
}

// 诊断步骤2: 测试联系表单提交
async function testContactSubmit(url, testName, testData) {
  console.log(`\n🧪 步骤2: 测试联系表单提交 - ${testName}`);
  console.log(`📍 URL: ${url}/api/contact/submit`);
  
  const result = makeRequest(`${url}/api/contact/submit`, 'POST', testData);
  
  console.log(`📊 状态码: ${result.statusCode}`);
  console.log(`⏱️  响应时间: ${result.responseTime}s`);
  console.log(`📋 响应: ${JSON.stringify(result.response, null, 2)}`);
  
  if (result.statusCode === 500) {
    console.log('🚨 发现500错误！');
    
    // 分析错误类型
    const errorMsg = result.response.msg || '';
    
    if (errorMsg.includes('数据库连接失败')) {
      console.log('   🔍 错误类型: 数据库初始化失败');
      console.log('   💡 可能原因:');
      console.log('      - Postgres连接字符串配置错误');
      console.log('      - 数据库实例未启动或不可访问');
      console.log('      - 网络连接问题');
      console.log('      - 环境变量缺失或错误');
    } else if (errorMsg.includes('保存数据失败')) {
      console.log('   🔍 错误类型: 数据插入失败');
      console.log('   💡 可能原因:');
      console.log('      - 数据表不存在或结构不匹配');
      console.log('      - 数据库权限问题');
      console.log('      - 数据验证失败');
      console.log('      - 数据库连接中断');
    } else if (errorMsg.includes('服务器错误')) {
      console.log('   🔍 错误类型: 未捕获的异常');
      console.log('   💡 可能原因:');
      console.log('      - 代码逻辑错误');
      console.log('      - 依赖包问题');
      console.log('      - 内存不足');
      console.log('      - 超时错误');
    } else {
      console.log('   🔍 错误类型: 未知错误');
      console.log('   💡 建议: 检查服务器日志获取详细信息');
    }
    
    return { hasError: true, errorType: errorMsg };
  } else if (result.statusCode === 0) {
    console.log('🚨 连接失败！');
    console.log('   💡 可能原因:');
    console.log('      - 服务器未运行');
    console.log('      - DNS解析问题');
    console.log('      - 防火墙阻止');
    console.log('      - SSL证书问题');
    return { hasError: true, errorType: 'connection_failed' };
  } else {
    console.log('✅ 请求成功');
    return { hasError: false, errorType: null };
  }
}

// 诊断步骤3: 检查环境配置
async function checkEnvironmentConfig(url) {
  console.log(`\n⚙️  步骤3: 检查环境配置`);
  
  // 尝试通过健康检查获取环境信息
  const healthResult = makeRequest(`${url}/api/health`, 'POST');
  
  if (healthResult.success && healthResult.response.environment) {
    const env = healthResult.response.environment;
    console.log('📋 环境变量状态:');
    console.log(`   NODE_ENV: ${env.NODE_ENV || 'undefined'}`);
    console.log(`   VERCEL_ENV: ${env.VERCEL_ENV || 'undefined'}`);
    console.log(`   hasPostgresUrl: ${env.hasPostgresUrl}`);
    console.log(`   hasDatabaseUrl: ${env.hasDatabaseUrl}`);
    console.log(`   hasUnpooledUrl: ${env.hasUnpooledUrl}`);
    
    // 分析配置问题
    if (env.VERCEL_ENV === 'production' && !env.hasPostgresUrl && !env.hasDatabaseUrl) {
      console.log('🚨 配置问题: 生产环境缺少数据库连接字符串');
      console.log('   💡 修复建议:');
      console.log('      1. 登录 Vercel Dashboard');
      console.log('      2. 进入项目 → Storage → 创建或连接 Postgres 数据库');
      console.log('      3. 确保环境变量自动配置');
      console.log('      4. 重新部署应用');
      return { configOk: false, issue: 'missing_db_config' };
    }
    
    if (env.NODE_ENV === 'production' && env.hasPostgresUrl) {
      console.log('✅ 生产环境配置正常');
    }
    
    return { configOk: true, environment: env };
  } else {
    console.log('❌ 无法获取环境配置信息');
    return { configOk: false, issue: 'health_check_failed' };
  }
}

// 诊断步骤4: 性能和连接测试
async function performanceTest(url) {
  console.log(`\n⚡ 步骤4: 性能和连接测试`);
  
  const tests = [
    { name: '健康检查', endpoint: '/api/health' },
    { name: '联系列表', endpoint: '/api/contact/list', method: 'POST', data: { page: 1, pageSize: 1 } }
  ];
  
  for (const test of tests) {
    console.log(`\n   测试: ${test.name}`);
    const result = makeRequest(`${url}${test.endpoint}`, test.method || 'GET', test.data);
    
    console.log(`   状态码: ${result.statusCode}`);
    console.log(`   响应时间: ${result.responseTime}s`);
    
    if (result.responseTime > 10) {
      console.log('   ⚠️  响应时间过长，可能存在性能问题');
    }
    
    if (!result.success) {
      console.log(`   ❌ 测试失败: ${JSON.stringify(result.response)}`);
    }
  }
}

// 生成诊断报告
function generateReport(results) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 诊断报告');
  console.log('='.repeat(60));
  
  const { health, contactTest, envConfig } = results;
  
  // 健康状态
  console.log(`\n🏥 健康状态: ${health.healthy ? '✅ 正常' : '❌ 异常'}`);
  if (health.healthy) {
    console.log(`   数据库类型: ${health.dbType}`);
    console.log(`   数据库连接: ${health.dbConnected ? '正常' : '失败'}`);
  }
  
  // 联系表单测试
  console.log(`\n📝 联系表单: ${contactTest.hasError ? '❌ 有错误' : '✅ 正常'}`);
  if (contactTest.hasError) {
    console.log(`   错误类型: ${contactTest.errorType}`);
  }
  
  // 环境配置
  console.log(`\n⚙️  环境配置: ${envConfig.configOk ? '✅ 正常' : '❌ 有问题'}`);
  if (!envConfig.configOk) {
    console.log(`   问题: ${envConfig.issue}`);
  }
  
  // 总结和建议
  console.log('\n🔧 修复建议:');
  
  if (!health.healthy) {
    console.log('1. 检查服务器状态和部署日志');
  }
  
  if (contactTest.hasError) {
    if (contactTest.errorType.includes('数据库')) {
      console.log('2. 检查数据库连接配置和状态');
      console.log('3. 确认环境变量正确设置');
    } else if (contactTest.errorType === 'connection_failed') {
      console.log('2. 检查域名解析和服务器可访问性');
    } else {
      console.log('2. 查看详细的服务器错误日志');
    }
  }
  
  if (!envConfig.configOk) {
    console.log('3. 修复环境变量配置');
    console.log('4. 重新部署应用');
  }
  
  console.log('\n📚 相关文档:');
  console.log('- 生产环境验证: ./PRODUCTION_DATABASE_VERIFICATION.md');
  console.log('- 问题排查指南: ./TROUBLESHOOTING_DATABASE_CONNECTION.md');
  console.log('- Vercel部署文档: ./doc/VERCEL_POSTGRES_README.md');
}

// 主诊断函数
async function runDiagnosis() {
  console.log('🔍 联系表单500错误诊断工具');
  console.log('='.repeat(60));
  
  const args = process.argv.slice(2);
  const url = args.find(arg => arg.startsWith('http')) || CONFIG.PRODUCTION_URL;
  
  if (url === 'https://your-domain.com') {
    console.log('⚠️  请提供生产环境URL:');
    console.log('   node scripts/diagnose-500-error.js https://your-actual-domain.com');
    console.log('   或设置环境变量: PRODUCTION_URL=https://your-domain.com');
    return;
  }
  
  console.log(`🎯 诊断目标: ${url}`);
  
  try {
    // 执行诊断步骤
    const health = await checkHealth(url);
    const contactTest = await testContactSubmit(url, '标准测试', {
      name: "诊断测试",
      phone: "13800138000",
      email: "test@example.com",
      company: "测试公司",
      content: "500错误诊断测试"
    });
    const envConfig = await checkEnvironmentConfig(url);
    
    await performanceTest(url);
    
    // 生成报告
    generateReport({ health, contactTest, envConfig });
    
    // 退出码
    if (!health.healthy || contactTest.hasError || !envConfig.configOk) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ 诊断过程中发生错误:', error.message);
    process.exit(1);
  }
}

// 显示使用说明
function showUsage() {
  console.log('联系表单500错误诊断工具');
  console.log('\n用法:');
  console.log('  node scripts/diagnose-500-error.js [URL]');
  console.log('\n参数:');
  console.log('  URL    要诊断的网站URL (可选，默认使用PRODUCTION_URL环境变量)');
  console.log('\n示例:');
  console.log('  node scripts/diagnose-500-error.js https://your-domain.com');
  console.log('  PRODUCTION_URL=https://your-domain.com node scripts/diagnose-500-error.js');
}

// 主程序
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showUsage();
} else {
  runDiagnosis().catch(error => {
    console.error('❌ 诊断失败:', error.message);
    process.exit(1);
  });
}