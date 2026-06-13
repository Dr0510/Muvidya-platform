"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.08)_0%,transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold text-gray-900">MuVidya</span>
              <span className="text-[10px] font-medium tracking-wider text-gray-500">
                Where Young Minds Build the Future
              </span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          </div>

          {children}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {altLink.label}{" "}
              <Link
                href={altLink.href}
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
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