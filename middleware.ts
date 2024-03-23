import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Define your public route patterns here
export const publicRoutesPatterns = [/^\/api\/public/];

export async function middleware(request: NextRequest) {
  const path = new URL(request.url).pathname;

  // Function to test if the path matches any public route pattern
  const isPublicRoute = publicRoutesPatterns.some((pattern) =>
    pattern.test(path)
  );

  if (isPublicRoute) {
    // If it is a public route, proceed without authentication
    return NextResponse.next();
  }
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return NextResponse.redirect(new URL("/auth", request.url));
  // }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    //Excluded paths
    "/((?!_next/static|_next/image|favicon.ico|api/|auth$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
