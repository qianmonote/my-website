import { NextResponse } from 'next/server';
import { initializeDatabase, isVercelPostgres } from '@/lib/database';
import { DatabaseAdapter } from '@/lib/database';

// 健康检查接口
export async function GET() {
  const startTime = Date.now();
  const healthCheck = {
    status: 'unknown',
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      hasPostgresUrl: !!(process.env.POSTGRES_URL || process.env.DATABASE_URL),
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasPostgresUrlOnly: !!process.env.POSTGRES_URL,
      hasUnpooledUrl: !!process.env.DATABASE_URL_UNPOOLED,
    },
    database: {
      type: 'unknown',
      connected: false,
      initializationTime: 0,
      testQueryTime: 0,
      error: null as string | null
    },
    api: {
      responseTime: 0
    }
  };

  try {
    // 1. 检测数据库类型
    const usePostgres = isVercelPostgres();
    healthCheck.database.type = usePostgres ? 'postgres' : 'sqlite';
    
    console.log('健康检查 - 数据库环境检测:', {
      POSTGRES_URL: !!process.env.POSTGRES_URL,
      DATABASE_URL: !!process.env.DATABASE_URL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      usePostgres
    });

    // 2. 测试数据库初始化
    const initStart = Date.now();
    try {
      await initializeDatabase();
      healthCheck.database.initializationTime = Date.now() - initStart;
      healthCheck.database.connected = true;
      console.log('健康检查 - 数据库初始化成功');
    } catch (initError) {
      healthCheck.database.initializationTime = Date.now() - initStart;
      healthCheck.database.error = `初始化失败: ${initError instanceof Error ? initError.message : String(initError)}`;
      console.error('健康检查 - 数据库初始化失败:', initError);
      throw initError;
    }

    // 3. 测试数据库查询
    const queryStart = Date.now();
    try {
      const testResult = await DatabaseAdapter.queryContacts({ page: 1, pageSize: 1 });
      healthCheck.database.testQueryTime = Date.now() - queryStart;
      console.log('健康检查 - 数据库查询成功:', {
        totalRecords: testResult.pagination.total,
        queryTime: healthCheck.database.testQueryTime
      });
    } catch (queryError) {
      healthCheck.database.testQueryTime = Date.now() - queryStart;
      healthCheck.database.error = `查询失败: ${queryError instanceof Error ? queryError.message : String(queryError)}`;
      console.error('健康检查 - 数据库查询失败:', queryError);
      throw queryError;
    }

    // 4. 设置成功状态
    healthCheck.status = 'healthy';
    healthCheck.api.responseTime = Date.now() - startTime;

    console.log('健康检查完成 - 状态正常:', {
      databaseType: healthCheck.database.type,
      totalTime: healthCheck.api.responseTime
    });

    return NextResponse.json(healthCheck, { status: 200 });

  } catch (error) {
    // 5. 错误处理
    healthCheck.status = 'unhealthy';
    healthCheck.api.responseTime = Date.now() - startTime;
    
    if (!healthCheck.database.error) {
      healthCheck.database.error = error instanceof Error ? error.message : String(error);
    }

    console.error('健康检查失败:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      environment: healthCheck.environment,
      databaseType: healthCheck.database.type
    });

    // 根据错误类型返回不同的状态码
    const isConnectionError = healthCheck.database.error?.includes('连接') || 
                             healthCheck.database.error?.includes('connection') ||
                             healthCheck.database.error?.includes('ECONNREFUSED');
    
    const statusCode = isConnectionError ? 503 : 500;
    
    return NextResponse.json(healthCheck, { status: statusCode });
  }
}

// 支持 POST 请求（用于更详细的诊断）
export async function POST() {
  const startTime = Date.now();
  const detailedCheck = {
    status: 'unknown',
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      hasPostgresUrl: !!(process.env.POSTGRES_URL || process.env.DATABASE_URL),
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasPostgresUrlOnly: !!process.env.POSTGRES_URL,
      hasUnpooledUrl: !!process.env.DATABASE_URL_UNPOOLED,
      hasPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
    },
    database: {
      type: 'unknown',
      connected: false,
      initializationTime: 0,
      testQueryTime: 0,
      recordCount: 0,
      error: null as string | null,
      connectionDetails: {
        autoDetection: false,
        environmentCheck: {
          POSTGRES_URL: !!process.env.POSTGRES_URL,
          DATABASE_URL: !!process.env.DATABASE_URL,
          VERCEL_ENV: process.env.VERCEL_ENV,
          isProduction: process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
        }
      }
    },
    api: {
      responseTime: 0
    },
    recommendations: [] as string[]
  };

  try {
    // 详细的环境检测
    const usePostgres = !!isVercelPostgres();
    detailedCheck.database.type = usePostgres ? 'postgres' : 'sqlite';
    detailedCheck.database.connectionDetails.autoDetection = usePostgres;
    
    // 数据库初始化和测试
    const initStart = Date.now();
    await initializeDatabase();
    detailedCheck.database.initializationTime = Date.now() - initStart;
    detailedCheck.database.connected = true;

    // 详细查询测试
    const queryStart = Date.now();
    const testResult = await DatabaseAdapter.queryContacts({ page: 1, pageSize: 10 });
    detailedCheck.database.testQueryTime = Date.now() - queryStart;
    detailedCheck.database.recordCount = testResult.pagination.total;

    // 生成建议
    if (!usePostgres && (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production')) {
      detailedCheck.recommendations.push('生产环境建议使用 Postgres 数据库以获得更好的性能和可靠性');
    }
    
    if (usePostgres && !process.env.DATABASE_URL_UNPOOLED) {
      detailedCheck.recommendations.push('建议配置 DATABASE_URL_UNPOOLED 以支持长时间运行的查询');
    }
    
    if (detailedCheck.database.testQueryTime > 1000) {
      detailedCheck.recommendations.push('数据库查询响应时间较慢，建议检查数据库性能');
    }

    detailedCheck.status = 'healthy';
    detailedCheck.api.responseTime = Date.now() - startTime;

    return NextResponse.json(detailedCheck, { status: 200 });

  } catch (error) {
    detailedCheck.status = 'unhealthy';
    detailedCheck.api.responseTime = Date.now() - startTime;
    detailedCheck.database.error = error instanceof Error ? error.message : String(error);

    // 错误分析和建议
    const errorMessage = detailedCheck.database.error.toLowerCase();
    
    if (errorMessage.includes('connection') || errorMessage.includes('连接')) {
      detailedCheck.recommendations.push('检查数据库连接字符串是否正确配置');
      detailedCheck.recommendations.push('确认数据库实例是否处于活跃状态');
    }
    
    if (errorMessage.includes('timeout') || errorMessage.includes('超时')) {
      detailedCheck.recommendations.push('数据库连接超时，检查网络连接和数据库负载');
    }
    
    if (!detailedCheck.environment.hasPostgresUrl && detailedCheck.environment.VERCEL_ENV === 'production') {
      detailedCheck.recommendations.push('生产环境缺少数据库连接字符串，请在 Vercel Dashboard 中配置');
    }

    const statusCode = errorMessage.includes('connection') ? 503 : 500;
    return NextResponse.json(detailedCheck, { status: statusCode });
  }
}