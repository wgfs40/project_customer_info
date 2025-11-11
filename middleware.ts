import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { getUserWithJWT } from "./actions/service-auth";
import { cookies } from "next/headers";

const protectedRoutes = ["/admin", "/profile", "/settings"];

const isProtectedRoute = (pathname: string) => {
  // Normalize pathname by removing trailing slash (unless it's just "/")
  const normalizedPathname =
    pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  // Check if the normalized path starts with any of the protected route prefixes
  return protectedRoutes.some((route) => normalizedPathname.startsWith(route));
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  await updateSession(request);

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  try {
    const cookiesStore = await cookies();
    const jwt = cookiesStore.get("access-token")?.value;

    if (!jwt) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    // Add your authentication logic here
    const getUser = await getUserWithJWT(jwt);

    const isAuthenticated = !!getUser.user;
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error verificando sesión:", error);
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
