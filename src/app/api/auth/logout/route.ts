import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // 获取当前用户的session token
    const sessionToken = request.cookies.get('admin_session_token')?.value;
    
    if (sessionToken) {
      // 从数据库中删除session记录
      const db = await getDatabase();
      await db.run('DELETE FROM user_sessions WHERE session_token = ?', [sessionToken]);
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