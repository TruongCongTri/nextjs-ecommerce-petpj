import { clerkMiddleware } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";
// import { siteConfig } from "./data/site-config";

export default clerkMiddleware();

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   if (
//     request.nextUrl.pathname === `${siteConfig.dashboard.create}` ||
//     request.nextUrl.pathname === `${siteConfig.dashboard.edit}` ||
//     request.nextUrl.pathname === `${siteConfig.dashboard.editCategory}` ||
//     request.nextUrl.pathname === `${siteConfig.dashboard.editPost}`
//   ) {
//     return NextResponse.rewrite(
//       new URL(`${siteConfig.dashboard.dashboard}`, request.url)
//     );
//   }

//   return NextResponse.redirect(new URL(`${siteConfig.home}`, request.url));
// }

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
