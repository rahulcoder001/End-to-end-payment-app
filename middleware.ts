import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const ispublic = path ==="/" || path ==="/signup" || path ==="/login";
    const token = request.cookies.get("token")?.value||"";
    if(ispublic&&token){
        return NextResponse.redirect(new URL('/Home', request.url))
    }
    if(!ispublic&&!token){
        return NextResponse.redirect(new URL('/', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/Home",
    "/Transaction",
    "/Transfer",
    "/ptop"
  ]
}