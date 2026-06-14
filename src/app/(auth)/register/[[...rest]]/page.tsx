"use client";

import { SignUp } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Sign up to get started with your admin dashboard"
      altLink={{
        label: "Already have an account?",
        href: "/login",
        text: "Sign in",
      }}
    >
      <SignUp
        path="/register"
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-none bg-transparent p-0",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton:
              "border border-border hover:bg-muted rounded-xl text-sm font-medium text-foreground/80 py-2.5",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground text-xs",
            formFieldLabel: "text-sm font-medium text-foreground/80",
            formFieldInput:
              "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
            formButtonPrimary:
              "w-full rounded-xl bg-gradient-to-r from-primary to-primary-600 text-primary-foreground font-semibold text-sm py-2.5 hover:shadow-lg hover:shadow-primary/25 transition-all",
            footerActionLink: "text-primary font-medium",
            identityPreviewEditButton: "text-primary",
            formFieldAction: "text-primary text-xs",
            alert: "rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3",
            alertText: "text-destructive",
            alertIcon: "text-destructive",
          },
        }}
      />
    </AuthLayout>
  );
}