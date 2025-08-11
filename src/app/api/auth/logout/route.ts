import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  try {
    // 获取当前用户的session token
    const sessionToken = request.cookies.get('admin_session_token')?.value;
    
    if (sessionToken) {
      // 判断是否使用 Vercel Postgres
      const isVercelPostgres = !!(process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.VERCEL_ENV);
      
      // 从数据库中删除session记录
      if (isVercelPostgres) {
        await sql`DELETE FROM user_sessions WHERE session_token = ${sessionToken}`;
      } else {
        const db = await getDatabase();
        await db.run('DELETE FROM user_sessions WHERE session_token = ?', [sessionToken]);
      }
    }

    // 创建响应对象
    const response = NextResponse.json({
      flag: 1,
      msg: '退出登录成功',
    });

    // 清除所有相关的cookies
    response.cookies.delete('admin_session');
    response.cookies.delete('admin_session_token');
    response.cookies.delete('admin_last_activity');

    return response;
  } catch (error) {
    console.error('退出登录错误:', error);
    return NextResponse.json(
      {
        flag: 0,
        msg: '退出登录失败',
      },
      { status: 500 }
    );
  }
}