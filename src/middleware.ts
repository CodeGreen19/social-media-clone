import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
const AUTH_ROUTES = ["/sign-up", "/sign-in"];
export function middleware(request: NextRequest) {
  //   const sessionCookie = getSessionCookie(request);
  //   const { pathname } = request.nextUrl;
  //   console.log(sessionCookie);

  //   if (!sessionCookie && !AUTH_ROUTES.includes(pathname)) {
  //     return NextResponse.redirect(new URL("/sign-in", request.url));
  //   }
  //   if (sessionCookie && AUTH_ROUTES.includes(pathname)) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
