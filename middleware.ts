import { NextRequest, NextResponse } from "next/server";
import auth from "./context/get-user";

export async function middleware(request: NextRequest) {
  const { user, accessToken } = await auth(request);
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    //Excluded paths
    "/((?!_next/static|_next/image|favicon.ico|api$|auth$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
