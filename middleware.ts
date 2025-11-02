import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useSelector } from "react-redux";

export function middleware(req: NextRequest) {
  const { authUser } = useSelector((state: any) => state.auth);

  const protectedPaths = ["/admin/product", "/admin/user"];

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!authUser) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
