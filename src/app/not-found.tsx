import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground/80 font-semibold hover:bg-muted transition-colors"
          >
            <Search className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}