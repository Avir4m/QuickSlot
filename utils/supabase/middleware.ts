import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Protected Routes
const protectedRoutes = [
  "/user",
  "/reset-password",
];  

// Auth Routes
const authRoutes = [
  "/sign-in",
  "/sign-up",
];

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const { data: user } = await supabase.auth.getUser();

    const isAuthRoute = authRoutes.some((path) => path === request.nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.some((path) => path === request.nextUrl.pathname);

    // Redirect if trying to access auth pages while logged in
    if (user.user && isAuthRoute) {
      return NextResponse.redirect(new URL("/user", request.url));
    }

    // Redirect if trying to access protected pages without being logged in
    if (!user.user && isProtectedRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return response;
  } catch (e) {
    console.error("Error in updateSession:", e);
    return response;
  }
};
