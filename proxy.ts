import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  const isAuthRoute = pathname.startsWith('/api/auth');
  const isLoginPage = pathname === '/login';
  const isAuthErrorPage = pathname === '/auth/error';
  const isPublicAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/assets');

  // Read NextAuth JWT token from cookies
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // If not authenticated and trying to access a protected route, redirect to login
  // Allow unauthenticated access to:
  // - /login
  // - /auth/error (NextAuth error page)
  // - /api/auth/*
  // - public assets
  if (!token && !isAuthRoute && !isLoginPage && !isAuthErrorPage && !isPublicAsset) {
    const loginUrl = new URL('/login', nextUrl.origin);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already authenticated and hitting the login page, send them home
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

