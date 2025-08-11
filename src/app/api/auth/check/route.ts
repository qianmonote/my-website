import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { cleanExpiredSessions } from '@/lib/init-sessions-table';
import { sql } from '@vercel/postgres';

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30分钟无操作自动退出

export async function GET(request: NextRequest) {
  try {
    // 检查基本session cookie
    const adminSession = request.cookies.get('admin_session');
    const sessionToken = request.cookies.get('admin_session_token');
    const lastActivity = request.cookies.get('admin_last_activity');

    if (!adminSession?.value || !sessionToken?.value) {
      return NextResponse.json(
        {
          flag: 0,
          msg: '未登录',
        },
        { status: 401 }
      );
    }

    // 判断是否使用 Vercel Postgres
    const isVercelPostgres = !!(process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.VERCEL_ENV);
    
    let session;
    
    if (isVercelPostgres) {
      // Postgres 环境
      // 清理过期会话
      await sql`DELETE FROM user_sessions WHERE expires_at <= NOW()`;
      
      // 验证session token
      const sessionResult = await sql`
        SELECT * FROM user_sessions 
        WHERE session_token = ${sessionToken.value} AND expires_at > NOW()
        LIMIT 1
      `;
      
      session = sessionResult.rows.length > 0 ? sessionResult.rows[0] : null;
    } else {
      // SQLite 环境
      const db = await getDatabase();
      
      // 清理过期会话
      await cleanExpiredSessions();
      
      // 验证session token
      session = await db.get(
        'SELECT * FROM user_sessions WHERE session_token = ? AND expires_at > datetime("now")',
        [sessionToken.value]
      );
    }

    if (!session) {
      // Session不存在或已过期
      const response = NextResponse.json(
        {
          flag: 0,
          msg: '会话已过期，请重新登录',
        },
        { status: 401 }
      );
      
      // 清除cookies
      response.cookies.delete('admin_session');
      response.cookies.delete('admin_session_token');
      response.cookies.delete('admin_last_activity');
      
      return response;
    }

    // 检查非活跃超时
    if (lastActivity?.value) {
      const lastActivityTime = parseInt(lastActivity.value);
      const now = Date.now();
      
      if (now - lastActivityTime > INACTIVITY_TIMEOUT) {
        // 超时，删除session并清除cookies
        if (isVercelPostgres) {
          await sql`DELETE FROM user_sessions WHERE session_token = ${sessionToken.value}`;
        } else {
          const db = await getDatabase();
          await db.run('DELETE FROM user_sessions WHERE session_token = ?', [sessionToken.value]);
        }
        
        const response = NextResponse.json(
          {
            flag: 0,
            msg: '长时间未操作，已自动退出登录',
          },
          { status: 401 }
        );
        
        response.cookies.delete('admin_session');
        response.cookies.delete('admin_session_token');
        response.cookies.delete('admin_last_activity');
        
        return response;
      }
    }

    // 更新最后活动时间
    if (isVercelPostgres) {
      await sql`
        UPDATE user_sessions 
        SET last_activity = NOW() 
        WHERE session_token = ${sessionToken.value}
      `;
    } else {
      const db = await getDatabase();
      await db.run(
        'UPDATE user_sessions SET last_activity = datetime("now") WHERE session_token = ?',
        [sessionToken.value]
      );
    }

    // 创建成功响应并更新活动时间cookie
    const response = NextResponse.json({
      flag: 1,
      msg: '已登录',
      user: {
        username: session.username,
        lastActivity: session.last_activity
      }
    });

    // 更新最后活动时间cookie
    response.cookies.set('admin_last_activity', Date.now().toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60, // 2小时
    });

    return response;
  } catch (error) {
    console.error('检查登录状态错误:', error);
    return NextResponse.json(
      {
        flag: 0,
        msg: '服务器错误',
      },
      { status: 500 }
    );
  }
}