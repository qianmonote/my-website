import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // 只处理/admin路径
  if (!path.startsWith('/admin')) {
    return NextResponse.next();
  }

  // 登录页面不需要验证
  if (path === '/admin/login') {
    return NextResponse.next();
  }

  // 检查登录状态
  const adminSession = request.cookies.get('admin_session');
  if (!adminSession?.value) {
    // 未登录时重定向到登录页
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
}; 