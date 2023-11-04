import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { jwt } from './lib/jwt';

export const middleware = async (request: NextRequest) => {
  const adminToken = request.cookies.get('admin-token')?.value;
  const isAdmin = adminToken ? await jwt.verify(adminToken) : false;
  const inLogin = request.nextUrl.pathname === '/admin/login';
  if (!isAdmin && !inLogin) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (isAdmin && inLogin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
};

export const config = {
  matcher: '/admin/:path*',
};
