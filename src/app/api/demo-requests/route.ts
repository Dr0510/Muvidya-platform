import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { demoRequestSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail, demoRequestConfirmationHtml, newLeadNotificationHtml } from "@/lib/email";
import { headers } from "next/headers";
import { SITE_CONFIG } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    // Rate limiting
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    const rateLimitResult = rateLimit(ip);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
          }
        }
      );
    }

    const body = await request.json();
    
    // Validate
    const validationResult = demoRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Find or create lead
    let lead = await prisma.lead.findFirst({
      where: { email: data.email },
    });

    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          company: data.schoolName || null,
          source: "website",
          status: "DEMO_SCHEDULED",
        },
      });
    }

    // Create demo request
    const demoRequest = await prisma.demoRequest.create({
      data: {
        leadId: lead.id,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        preferredTime: data.preferredTime || null,
        schoolName: data.schoolName || null,
        city: data.city || null,
        state: data.state || null,
        gradeLevel: data.gradeLevel || null,
        subjectArea: data.subjectArea || null,
        studentCount: data.studentCount && data.studentCount !== "" ? parseInt(data.studentCount, 10) : null,
        message: data.message || null,
      },
    });

    // Send email notifications (non-blocking)
    Promise.all([
      sendEmail({
        to: data.email,
        subject: "Demo Request Received - MuVidya",
        html: demoRequestConfirmationHtml({
          name: data.name,
          schoolName: data.schoolName,
          date: data.preferredDate,
        }),
      }),
      sendEmail({
        to: process.env.ADMIN_EMAIL || SITE_CONFIG.email,
        subject: `New Demo Request - ${data.name}`,
        html: newLeadNotificationHtml({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.schoolName,
          source: "Demo Request Form",
        }),
      }),
    ]).catch((err) => console.error("Email send error:", err));

    return NextResponse.json(
      { success: true, data: { lead, demoRequest } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50")));
    const skip = (page - 1) * limit;

    const [demoRequests, total] = await Promise.all([
      prisma.demoRequest.findMany({
        include: { lead: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.demoRequest.count(),
    ]);

    return NextResponse.json({
      data: demoRequests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Demo requests fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
