import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('next-auth.session-token')?.value;
  const token: any = await getToken({ req: request });

  // const publicurl =
  //   request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/signup';

  // //for admin
  // const currPath = request.nextUrl.pathname;
  // if (currPath.includes('auth')) {
  //   if (
  //     authToken &&
  //     token?.role.find(
  //       (user: { authority: string }) => user.authority !== 'ROLE_ADMIN'
  //     )
  //   ) {
  //     return NextResponse.redirect(new URL('/home', request.url));
  //   }
  // }

  // //for customer and public routes
  // if (publicurl) {
  //   if (authToken) {
  //     return NextResponse.redirect(new URL('/home', request.url));
  //   }
  // } else {
  //   if (!authToken) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // }
}

export const config = { matcher: ['/home/:path*', '/auth/:path*', '/'] };
