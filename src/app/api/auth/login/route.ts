import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { initDatabase } from '@/lib/init-database';
import { cleanExpiredSessions } from '@/lib/init-sessions-table';
import crypto from 'crypto';

interface LoginRequestBody {
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body: LoginRequestBody = await request.json();
    const { username, password } = body;

    // 验证必填字段
    if (!username || !password) {
      return NextResponse.json(
        {
          flag: 0,
          msg: '用户名和密码不能为空',
        },
        { status: 400 }
      );
    }

    // 获取数据库连接
    const db = await getDatabase();

    // 初始化数据库（包括用户表和会话表）
    await initDatabase();
    
    // 清理过期会话
    await cleanExpiredSessions();

    // 查询用户
    const user = await db.get(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (!user) {
      return NextResponse.json(
        {
          flag: 0,
          msg: '用户名或密码错误',
        },
        { status: 401 }
      );
    }

    // 检查是否已有活跃会话（单点登录限制）
    const existingSession = await db.get(
      'SELECT * FROM user_sessions WHERE user_id = ? AND expires_at > datetime("now")',
      [user.id]
    );

    let hasExistingSession = false;
    if (existingSession) {
      hasExistingSession = true;
      // 删除旧会话，强制其他地方退出
      await db.run('DELETE FROM user_sessions WHERE user_id = ?', [user.id]);
    }

    // 生成新的session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2小时后过期
    
    // 获取客户端信息
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // 保存新会话到数据库
    await db.run(
      `INSERT INTO user_sessions 
       (user_id, username, session_token, expires_at, ip_address, user_agent) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user.id, user.username, sessionToken, expiresAt.toISOString(), ipAddress, userAgent]
    );

    // 创建响应对象
    const response = NextResponse.json({
      flag: 1,
      msg: hasExistingSession ? '检测到该账号在其他地方登录，已强制退出其他会话并成功登录' : '登录成功',
      hasExistingSession: hasExistingSession
    });

    // 设置登录会话cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 2 * 60 * 60, // 2小时
    };
    
    response.cookies.set('admin_session', 'true', cookieOptions);
    response.cookies.set('admin_session_token', sessionToken, cookieOptions);
    response.cookies.set('admin_last_activity', Date.now().toString(), cookieOptions);

    return response;
  } catch (error) {
    console.error('登录错误:', error);
    return NextResponse.json(
      {
        flag: 0,
        msg: '登录失败，请稍后重试',
      },
      { status: 500 }
    );
  }
}