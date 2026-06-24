"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  altLink: {
    label: string;
    href: string;
    text: string;
  };
}

export function AuthLayout({ children, title, subtitle, altLink }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.08)_0%,transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary-600 opacity-15" />
              <Image
                src="/images/brand/muvidya-logo.png"
                alt="MμVidya logo"
                width={48}
                height={48}
                className="relative h-9 w-9 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold text-foreground">MμVidya</span>
              <span className="text-[11px] font-medium tracking-wider text-muted-foreground">
                Where Young Minds Build the Future
              </span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-xl border border-border/60 p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          </div>

          {children}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {altLink.label}{" "}
              <Link
                href={altLink.href}
                className="font-semibold text-primary hover:text-primary-600 transition-colors"
              >
                {altLink.text}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}