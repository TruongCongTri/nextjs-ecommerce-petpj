// // const allowedRoutes = [
//   //   "/login",
//   //   "/register",
//   //   "/forgot-password",
//   //   "/reset-password",
//   //   "/",
//   //   "/categories/:path",
//   //   "/products/:path",
//   //   "/blogs/:path",
//   //   "/contact-us/:path",
//   //   "/blogs/:path",
//   // ]; // list of allowed paths user can visit without the token

//   import { NextResponse } from 'next/server'
//   import type { NextRequest } from 'next/server'

//   export function middleware(request: NextRequest) {

//     const { pathname } = request.nextUrl
//     /* ignore routes starting with api and _next (temp solution)
//       matchers in next.config isn't working
//       without this the middleware will run more than once
//      so to avoid this we will ignore all paths with /api and  /_next
//      */
//     if (
//       request.nextUrl.pathname.startsWith('/api/') ||
//       request.nextUrl.pathname.startsWith('/_next/')
//     ) {
//       return NextResponse.next()
//     }

//     // our logic starts from here

//     let token = request.cookies.get('token')?.value // retrieve the token
//     const allowedRoutes = ['/login', '/register', '/reset-password', '/forgot-password'] // list of allowed paths user can visit without the token
//     const isRouteAllowed = allowedRoutes.some((prefix) => pathname.startsWith(prefix)) // check path and see if matches our list then return a boolean

//     // redirect to login if no token
//     if (!token) {
//       if (isRouteAllowed) {
//         // check if path is allowed
//         return NextResponse.next()
//       }
//       // if path is not allowed redirect to signin page
//       return NextResponse.redirect(new URL('/login', request.url))
//     }

//     //redirect to home page if logged in
//     if (isRouteAllowed && token) {
//       return NextResponse.redirect(new URL('/', request.url))
//     }
//   }

//   // See "Matching Paths" below to learn more
// //   export const config = {
// //     matcher: ['/categories/:path*', '/product/:path*'],
// //   }

// ~/middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// middleware fnc
export function middleware(request: NextRequest) {
  console.log("middleware just run");
  const token = request.cookies.get("token")?.value;
  const ck = request.cookies;
  console.log(ck);

  if (request.nextUrl.pathname.startsWith("/categories")) {
    return NextResponse.rewrite(
      new URL("/categories?page=1&per_page=5", request.url)
    );
  }

  if (token) {
    // if has token
    //then delete cookies
    // request.cookies.delete('token');
    // then allow to access requested url
    return NextResponse.next();
  }
  // return NextResponse.redirect(new URL('/', request.url))
  // return NextResponse.rewrite(new URL(`/account/login`, request.url));
  return NextResponse.redirect(
    new URL(`/login?nextRequest=${request.url}`, request.url)
  );
}

// config của middleware
export const config = {
  // matcher: ['/account/dashboard', '/account/order-history', '/account/settings', '/cart', '/checkout', '/wishlist']
  // matcher: [`/wishlist`, `/cart/:path*`, `/account/:path*`],
  matcher: [`/account/:path*`],

};
// `/cart/check-out`, 