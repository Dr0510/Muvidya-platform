import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ data: testimonials });
  } catch (error) {
    console.error("Testimonials fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        role: body.role || null,
        school: body.school || null,
        content: body.content,
        rating: body.rating || 5,
        type: body.type || "text",
        image: body.image || null,
        videoUrl: body.videoUrl || null,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder || 0,
      },
    });
    return NextResponse.json({ data: testimonial }, { status: 201 });
  } catch (error) {
    console.error("Testimonial create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
