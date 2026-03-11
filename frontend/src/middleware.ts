import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { DASHBOARD_PAGES } from "./config/pages-url.config";

export async function middleware(request:NextRequest) {
  const { nextUrl, cookies } = request
  
  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  const isAuthPage = nextUrl.pathname.startsWith('/auth')

  // пользователь авторизован и пытается зайти в /auth
  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url))
  }

  // пользователь не авторизован
  if (!refreshToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

// два сценария: заход на любую страницу кабинета и на страницу входа
export const config = {
  matcher: ['/lk/:path*', '/auth/:path*']
}