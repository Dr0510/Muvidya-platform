"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wrench,
  MessageSquare,
  Package,
  ChevronLeft,
  Menu,
  Sparkles,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Demo Requests", href: "/admin/demo-requests", icon: CalendarCheck },
  { label: "Workshop Requests", href: "/admin/workshop-requests", icon: Wrench },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border/60">
          {sidebarOpen && (
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-foreground">MuVidya</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={cn("transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border/60">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                View Site
              </a>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 rounded-full ring-2 ring-primary-500/20",
                  },
                }}
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}