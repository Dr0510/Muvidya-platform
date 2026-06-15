import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/leads(.*)",
  "/demo-requests(.*)",
  "/workshop-requests(.*)",
  "/enquiries(.*)",
  "/testimonials(.*)",
  "/analytics(.*)",
  "/admin(.*)",
  "/api/admin(.*)",
  "/api/leads(.*)",
  "/api/demo-requests(.*)",
  "/api/workshop-requests(.*)",
  "/api/enquiries(.*)",
  "/api/testimonials(.*)",
  "/api/projects(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
