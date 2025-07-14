import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

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

    // 创建响应对象
    const response = NextResponse.json({
      flag: 1,
      msg: '登录成功',
    });

    // 设置登录会话cookie
    response.cookies.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7天
    });

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