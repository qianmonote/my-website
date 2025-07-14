import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 检查登录状态
    const adminSession = request.cookies.get('admin_session');

    if (!adminSession?.value) {
      return NextResponse.json(
        {
          flag: 0,
          msg: '未登录',
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      flag: 1,
      msg: '已登录',
    });
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