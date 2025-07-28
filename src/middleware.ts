import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 只对admin路径进行认证检查
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // 登录页面不需要检查
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // 检查是否有session cookies
    const adminSession = request.cookies.get('admin_session');
    const sessionToken = request.cookies.get('admin_session_token');

    if (!adminSession?.value || !sessionToken?.value) {
      // 重定向到登录页面
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};