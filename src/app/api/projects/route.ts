import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error("Projects fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        shortDesc: body.shortDesc || null,
        image: body.image || null,
        difficulty: body.difficulty || "beginner",
        skills: body.skills || [],
        gradeLevel: body.gradeLevel || null,
        category: body.category || null,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder || 0,
      },
    });
    return NextResponse.json({ data: project }, { status: 201 });
  } catch (error) {
    console.error("Project create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
