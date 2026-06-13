import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { workshopEnquirySchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail, workshopEnquiryConfirmationHtml, newLeadNotificationHtml } from "@/lib/email";
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
    
    const validationResult = workshopEnquirySchema.safeParse(body);
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
          status: "WORKSHOP",
        },
      });
    }

    // Create workshop request
    const workshopRequest = await prisma.workshopRequest.create({
      data: {
        leadId: lead.id,
        workshopType: data.workshopType || null,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        duration: data.duration || null,
        studentCount: data.studentCount ? parseInt(data.studentCount, 10) : null,
        gradeLevel: data.gradeLevel || null,
        schoolName: data.schoolName || null,
        city: data.city || null,
        state: data.state || null,
        message: data.message || null,
      },
    });

    // Send email notifications (non-blocking)
    Promise.all([
      sendEmail({
        to: data.email,
        subject: "Workshop Enquiry Received - MuVidya",
        html: workshopEnquiryConfirmationHtml({
          name: data.name,
          workshopType: data.workshopType,
          schoolName: data.schoolName,
        }),
      }),
      sendEmail({
        to: process.env.ADMIN_EMAIL || "admin@muvidya.com",
        subject: `New Workshop Enquiry - ${data.name}`,
        html: newLeadNotificationHtml({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.schoolName,
          source: "Workshop Enquiry Form",
        }),
      }),
    ]).catch((err) => console.error("Email send error:", err));

    return NextResponse.json(
      { success: true, data: { lead, workshopRequest } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Workshop request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const workshopRequests = await prisma.workshopRequest.findMany({
      include: { lead: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: workshopRequests });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}