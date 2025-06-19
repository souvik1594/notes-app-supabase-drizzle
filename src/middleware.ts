import { NextResponse, type NextRequest } from "next/server";
import { getUser } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const path = new URL(request.url).pathname;
  console.log("🚀 ~ path:", path);

  const unprotectedPaths = ["/login", "/register"];

  const { user } = await getUser();
  const isUnprotectedPath = unprotectedPaths.some((up) => path.startsWith(up));

  if (user && isUnprotectedPath) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!user && !isUnprotectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  console.log("🚀 ~ user:", user);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
