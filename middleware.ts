import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicOnlyRoutes = ["/login", "/signup", "/verify-email"];

const protectedRoutes = ["/dashboard", "/profile", "/settings"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const isAuthenticated = !!accessToken || !!refreshToken;
  const { pathname } = request.nextUrl;

  if (isAuthenticated && publicOnlyRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
