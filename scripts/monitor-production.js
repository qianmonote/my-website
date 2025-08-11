#!/usr/bin/env node

/**
 * 生产环境监控脚本
 * 用于监控线上数据库连接状态和API健康状况
 */

import { execSync } from 'child_process';
import fs from 'fs';

// 配置
const CONFIG = {
  // 生产环境域名（需要根据实际情况修改）
  PRODUCTION_URL: process.env.PRODUCTION_URL || 'https://your-domain.com',
  // 监控间隔（秒）
  MONITOR_INTERVAL: parseInt(process.env.MONITOR_INTERVAL || '30'),
  // 最大重试次数
  MAX_RETRIES: parseInt(process.env.MAX_RETRIES || '3'),
  // 超时时间（毫秒）
  TIMEOUT: parseInt(process.env.TIMEOUT || '10000')
};

console.log('🔍 生产环境监控启动...');
console.log('=' .repeat(60));
console.log(`监控地址: ${CONFIG.PRODUCTION_URL}`);
console.log(`监控间隔: ${CONFIG.MONITOR_INTERVAL}秒`);
console.log(`超时时间: ${CONFIG.TIMEOUT}毫秒`);
console.log('=' .repeat(60));

// 健康检查函数
async function checkHealth(url, retries = 0) {
  const timestamp = new Date().toISOString();
  
  try {
    console.log(`\n[${timestamp}] 🔍 检查健康状态...`);
    
    // 检查基本健康状态
    const healthResult = await makeRequest(`${url}/api/health`, 'GET');
    
    if (healthResult.status === 'healthy') {
      console.log('✅ 基本健康检查通过');
      console.log(`   数据库类型: ${healthResult.database.type}`);
      console.log(`   响应时间: ${healthResult.api.responseTime}ms`);
      
      // 检查详细状态
      const detailedResult = await makeRequest(`${url}/api/health`, 'POST');
      
      if (detailedResult.status === 'healthy') {
        console.log('✅ 详细健康检查通过');
        console.log(`   数据库记录数: ${detailedResult.database.recordCount}`);
        console.log(`   数据库连接时间: ${detailedResult.database.initializationTime}ms`);
        console.log(`   查询时间: ${detailedResult.database.testQueryTime}ms`);
        
        if (detailedResult.recommendations.length > 0) {
          console.log('💡 建议:');
          detailedResult.recommendations.forEach(rec => {
            console.log(`   - ${rec}`);
          });
        }
        
        // 测试联系表单API
        await testContactAPI(url);
        
        return { success: true, data: detailedResult };
      } else {
        throw new Error(`详细健康检查失败: ${detailedResult.database.error}`);
      }
    } else {
      throw new Error(`健康检查失败: ${healthResult.database.error}`);
    }
    
  } catch (error) {
    console.log(`❌ 健康检查失败: ${error.message}`);
    
    if (retries < CONFIG.MAX_RETRIES) {
      console.log(`🔄 重试 ${retries + 1}/${CONFIG.MAX_RETRIES}...`);
      await sleep(5000); // 等待5秒后重试
      return checkHealth(url, retries + 1);
    } else {
      console.log('🚨 达到最大重试次数，健康检查失败');
      return { success: false, error: error.message };
    }
  }
}

// 测试联系表单API
async function testContactAPI(url) {
  try {
    console.log('🧪 测试联系表单API...');
    
    const testData = {
      page: 1,
      pageSize: 5
    };
    
    const result = await makeRequest(`${url}/api/contact/list`, 'POST', testData);
    
    if (result.flag === 1) {
      console.log('✅ 联系表单API正常');
      console.log(`   返回记录数: ${result.data.pagination.total}`);
    } else {
      throw new Error(`API返回错误: ${result.msg}`);
    }
  } catch (error) {
    console.log(`❌ 联系表单API测试失败: ${error.message}`);
    throw error;
  }
}

// 发送HTTP请求
async function makeRequest(url, method = 'GET', data = null) {
  const curlCommand = buildCurlCommand(url, method, data);
  
  try {
    const result = execSync(curlCommand, {
      encoding: 'utf8',
      timeout: CONFIG.TIMEOUT
    });
    
    return JSON.parse(result);
  } catch (error) {
    if (error.code === 'TIMEOUT') {
      throw new Error(`请求超时: ${url}`);
    } else if (error.status) {
      throw new Error(`HTTP错误 ${error.status}: ${url}`);
    } else {
      throw new Error(`网络错误: ${error.message}`);
    }
  }
}

// 构建curl命令
function buildCurlCommand(url, method, data) {
  let command = `curl -s -X ${method}`;
  
  if (data) {
    command += ` -H "Content-Type: application/json"`;
    command += ` -d '${JSON.stringify(data)}'`;
  }
  
  command += ` "${url}"`;
  return command;
}

// 睡眠函数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 生成监控报告
function generateReport(results) {
  const timestamp = new Date().toISOString();
  const successCount = results.filter(r => r.success).length;
  const failureCount = results.length - successCount;
  const successRate = ((successCount / results.length) * 100).toFixed(2);
  
  const report = {
    timestamp,
    summary: {
      totalChecks: results.length,
      successCount,
      failureCount,
      successRate: `${successRate}%`
    },
    results: results.slice(-10) // 保留最近10次结果
  };
  
  // 保存报告到文件
  const reportFile = `monitoring-report-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  
  console.log(`\n📊 监控报告已保存: ${reportFile}`);
  console.log(`成功率: ${successRate}% (${successCount}/${results.length})`);
  
  return report;
}

// 检查是否需要告警
function checkAlerts(results) {
  const recentResults = results.slice(-5); // 最近5次结果
  const recentFailures = recentResults.filter(r => !r.success).length;
  
  if (recentFailures >= 3) {
    console.log('\n🚨 告警: 连续多次健康检查失败!');
    console.log('建议立即检查:');
    console.log('1. Vercel 部署状态');
    console.log('2. 数据库连接配置');
    console.log('3. 环境变量设置');
    
    // 这里可以添加发送告警通知的逻辑
    // 例如发送邮件、Slack消息等
    
    return true;
  }
  
  return false;
}

// 主监控循环
async function startMonitoring() {
  const results = [];
  let checkCount = 0;
  
  console.log('\n🚀 开始监控...');
  
  while (true) {
    checkCount++;
    console.log(`\n--- 第 ${checkCount} 次检查 ---`);
    
    const result = await checkHealth(CONFIG.PRODUCTION_URL);
    results.push({
      timestamp: new Date().toISOString(),
      checkNumber: checkCount,
      ...result
    });
    
    // 检查告警
    checkAlerts(results);
    
    // 每10次检查生成一次报告
    if (checkCount % 10 === 0) {
      generateReport(results);
    }
    
    // 等待下次检查
    console.log(`\n⏰ 等待 ${CONFIG.MONITOR_INTERVAL} 秒后进行下次检查...`);
    await sleep(CONFIG.MONITOR_INTERVAL * 1000);
  }
}

// 单次检查模式
async function singleCheck() {
  console.log('\n🔍 执行单次健康检查...');
  
  const result = await checkHealth(CONFIG.PRODUCTION_URL);
  
  if (result.success) {
    console.log('\n✅ 生产环境状态正常');
    process.exit(0);
  } else {
    console.log('\n❌ 生产环境存在问题');
    console.log('错误信息:', result.error);
    process.exit(1);
  }
}

// 命令行参数处理
const args = process.argv.slice(2);
const mode = args[0] || 'single';

if (mode === 'monitor') {
  startMonitoring().catch(error => {
    console.error('监控程序异常退出:', error);
    process.exit(1);
  });
} else if (mode === 'single') {
  singleCheck().catch(error => {
    console.error('健康检查失败:', error);
    process.exit(1);
  });
} else {
  console.log('使用方法:');
  console.log('  node scripts/monitor-production.js single   # 单次检查');
  console.log('  node scripts/monitor-production.js monitor  # 持续监控');
  console.log('\n环境变量:');
  console.log('  PRODUCTION_URL     # 生产环境URL');
  console.log('  MONITOR_INTERVAL   # 监控间隔（秒）');
  console.log('  MAX_RETRIES        # 最大重试次数');
  console.log('  TIMEOUT            # 超时时间（毫秒）');
  process.exit(1);
}