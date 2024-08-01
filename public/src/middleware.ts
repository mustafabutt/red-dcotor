import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from "next-auth/react"
import { getToken } from "next-auth/jwt";


export async function middleware(request: NextRequest,res: NextResponse) {
  let decodedToken=null;  let token=null;

  if(request.cookies.get('access_token')?.value != undefined || request.cookies.get('access_token')?.value != null)
    token = request.cookies.get('access_token')?.value;
  else token = request.cookies.get('next-auth.session-token')?.value;
  
  if(token && request.nextUrl.pathname == '/signin')
    return NextResponse.redirect(new URL('/', request.url))
  else if(!token && request.nextUrl.pathname == '/')
    return NextResponse.redirect(new URL('/signin', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/signin','/((?!api|_next|.*\\..*).*)']
}
