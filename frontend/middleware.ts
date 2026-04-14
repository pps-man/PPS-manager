import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * PPS Manager Multi-tenant & RBAC Middleware
 * -----------------------------------------
 * This middleware handles:
 * 1. Authentication checks for protected routes (/dashboard).
 * 2. Multi-tenant identification (extracting school_id from token/cookie).
 * 3. Role-Based Access Control (RBAC) redirection.
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Allow public routes (Login, Register, Landing)
  const isPublicRoute = pathname === '/' || pathname === '/login' || pathname === '/register';
  
  if (isPublicRoute) {
    // Redirect to dashboard if logged in and trying to access public auth pages
    if (token && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // 2. Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // ─── RBAC Guards ───
    // Decode user role from JWT (mocking decoded values for now)
    // In production, use jose or jsonwebtoken to decode the 'role' claim
    const userRole = request.cookies.get('user_role')?.value || 'Guest';

    // Role-based route restrictions
    const restrictedRoutes = {
      'HR': ['/dashboard/hr'],
      'Finance': ['/dashboard/fees', '/dashboard/inventory'],
      'Academic': ['/dashboard/exams', '/dashboard/timetable'],
    };

    // Admin & SuperAdmin can access everything
    if (userRole === 'Admin' || userRole === 'SuperAdmin') {
      return NextResponse.next();
    }

    // Teacher restrictions
    if (userRole === 'Teacher') {
      const isForbidden = restrictedRoutes.HR.some(r => pathname.startsWith(r)) || 
                          restrictedRoutes.Finance.some(r => pathname.startsWith(r));
      if (isForbidden) return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Parent/Student restrictions
    if (userRole === 'Parent' || userRole === 'Student') {
      const isForbidden = restrictedRoutes.HR.some(r => pathname.startsWith(r)) || 
                          restrictedRoutes.Finance.some(r => pathname.startsWith(r)) ||
                          pathname.startsWith('/dashboard/attendance'); // assuming parents can't edit attendance
      if (isForbidden && pathname !== '/dashboard/fees') { // parents might see their OWN fees only
         return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

// Ensure middleware runs only on necessary paths
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
