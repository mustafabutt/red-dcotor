import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from "next-auth/react"
import { getToken } from "next-auth/jwt";

const protectedRoutes = [
  'doctor',
  'location'
];
const unprotectedRoutes = ['/signin'];
export async function middleware(request: NextRequest,response: NextResponse) {
  let decodedToken=null;  let token=null;

  const url = request.nextUrl.clone();
  const fullUrl = `${url.protocol}//${url.host}${url.pathname}${url.search}`;
  const res = NextResponse.next();
  res.headers.set('x-full-url', url.pathname);

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    request.nextUrl.pathname.includes(prefix)
  );
  if(request.cookies.get('access_token')?.value != undefined || request.cookies.get('access_token')?.value != null)
    token = request.cookies.get('access_token')?.value;
  else token = request.cookies.get('next-auth.session-token')?.value;
  
  if(token && unprotectedRoutes.includes(request.nextUrl.pathname))
    return NextResponse.redirect(new URL('/', request.url))
  else if(!token && request.nextUrl.pathname == '/')
    return NextResponse.redirect(new URL('/signin', request.url))
  else if(!token && isProtectedRoute)
    return NextResponse.redirect(new URL('/signin', request.url))
  return res 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
