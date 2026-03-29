import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get user session from cookies (simulated for now)
  // In a real app, you would verify the JWT from the cookie.
  const authSession = request.cookies.get('smarted_session')?.value;
  
  // Public routes
  const isPublicRoute = pathname === '/' || pathname === '/login' || pathname.startsWith('/api/auth');
  
  if (!authSession && !isPublicRoute) {
    // Redirect unauthenticated to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (authSession) {
    try {
      const user = JSON.parse(authSession);
      const { role } = user;
      
      // Strict Role-Based Access Control
      if (pathname.startsWith('/student') && role !== 'STUDENT') {
        return NextResponse.redirect(new URL('/403', request.url));
      }
      
      if (pathname.startsWith('/teacher') && role !== 'TEACHER') {
        return NextResponse.redirect(new URL('/403', request.url));
      }
      
      // Prevent logged in users from seeing login page
      if (pathname === '/login') {
        return NextResponse.redirect(new URL(role === 'STUDENT' ? '/student' : '/teacher', request.url));
      }
      
    } catch (e) {
      // Handle invalid session
      return NextResponse.redirect(new URL('/login', request.url));
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
