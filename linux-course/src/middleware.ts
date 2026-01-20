import { NextResponse } from 'next/server';
import { auth } from './auth';
 
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Защищенные маршруты, требующие аутентификации
  const isOnCourse = nextUrl.pathname.startsWith('/course');
  const isOnProfile = nextUrl.pathname.startsWith('/profile');
  const isOnCertificates = nextUrl.pathname.startsWith('/certificates');
  
  // Перенаправление на страницу входа, если пользователь не авторизован
  if ((isOnCourse || isOnProfile || isOnCertificates) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  // Перенаправление на страницу курса, если пользователь авторизован и пытается зайти на страницу входа или регистрации
  if (isLoggedIn && (nextUrl.pathname.startsWith('/auth/login') || nextUrl.pathname.startsWith('/auth/register'))) {
    return NextResponse.redirect(new URL('/course', nextUrl));
  }

  return NextResponse.next();
});

// Конфигурация для middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};