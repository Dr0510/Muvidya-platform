import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail, newsletterWelcomeHtml } from "@/lib/email";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    const rateLimitResult = rateLimit(ip);
    
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();
    const validationResult = newsletterSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Upsert subscriber
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { isActive: true, unsubscribedAt: null },
      create: { email },
    });

    // Send welcome email
    sendEmail({
      to: email,
      subject: "Welcome to MuVidya!",
      html: newsletterWelcomeHtml({ email }),
    }).catch((err) => console.error("Welcome email error:", err));

    return NextResponse.json({ success: true, data: subscriber }, { status: 201 });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}