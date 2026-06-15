import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail, contactAutoReplyHtml, newLeadNotificationHtml } from "@/lib/email";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
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
    
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    let lead = await prisma.lead.findFirst({
      where: { email: data.email },
    });

    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          source: "website",
          status: "ENQUIRY",
        },
      });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        leadId: lead.id,
        subject: data.subject,
        message: data.message,
      },
    });

    Promise.all([
      sendEmail({
        to: data.email,
        subject: "Thank You for Contacting MuVidya",
        html: contactAutoReplyHtml({ name: data.name }),
      }),
      sendEmail({
        to: process.env.ADMIN_EMAIL || "admin@muvidya.com",
        subject: `New Enquiry: ${data.subject} - ${data.name}`,
        html: newLeadNotificationHtml({
          name: data.name,
          email: data.email,
          phone: data.phone,
          source: "Contact Form",
        }),
      }),
    ]).catch((err) => console.error("Email send error:", err));

    return NextResponse.json(
      { success: true, data: { lead, enquiry } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry error:", error);
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

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        include: { lead: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.enquiry.count(),
    ]);

    return NextResponse.json({
      data: enquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Enquiries fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
