"use client";

import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your admin dashboard"
      altLink={{
        label: "Don't have an account?",
        href: "/register",
        text: "Sign up",
      }}
    >
      <SignIn
        path="/login"
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-none bg-transparent p-0",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton:
              "border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-medium text-gray-700 py-2.5",
            dividerLine: "bg-gray-200",
            dividerText: "text-gray-400 text-xs",
            formFieldLabel: "text-sm font-medium text-gray-700",
            formFieldInput:
              "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all",
            formButtonPrimary:
              "w-full rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm py-2.5 hover:shadow-lg hover:shadow-primary-500/25 transition-all",
            footerActionLink: "text-primary-600 font-medium",
            identityPreviewEditButton: "text-primary-600",
            formFieldAction: "text-primary-600 text-xs",
            alert: "rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm p-3",
            alertText: "text-red-700",
            alertIcon: "text-red-500",
          },
        }}
      />
    </AuthLayout>
  );
}