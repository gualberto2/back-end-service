import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

type User = {
  id: string;
};

const getUserAuth = async (
  request: NextRequest,
  supabase: any
): Promise<User | null> => {
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    return data.user;
  } else {
    return null;
  }
};

const getSessionData = async (supabase: any): Promise<string | null> => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionData = sessionResponse.data.session;

  if (sessionData) {
    return sessionData.access_token;
  } else {
    return null;
  }
};

const auth = async (
  request: NextRequest
): Promise<{ user: User | null; accessToken: string | null }> => {
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

  const user = await getUserAuth(request, supabase);
  const accessToken = await getSessionData(supabase);

  return { user, accessToken };
};

export default auth;
