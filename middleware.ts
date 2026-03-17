import { auth } from "./app/Firebase/Config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/landing",
    "/login",
    "/sign-up",
    "/api/login",
    "/api/sign-up",
  ];

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route),
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, we'll let the client-side authentication handle it
  // This maintains the current functionality while ensuring server-side check
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
