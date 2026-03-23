// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const currentUser = request.cookies.get('session-token')?.value // Example token
  
  // If user is logged in and trying to access the login page, send to dashboard
  if (currentUser && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // If user is NOT logged in and trying to access protected route, send to login
  if (!currentUser && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}