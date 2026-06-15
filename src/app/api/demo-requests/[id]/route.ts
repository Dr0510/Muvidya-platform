import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const updateDemoRequestSchema = z.object({
  status: z.string().min(1).max(50).optional(),
  preferredDate: z.string().optional().or(z.literal("")),
  preferredTime: z.string().max(50).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const demoRequest = await prisma.demoRequest.findUnique({
      where: { id },
      include: { lead: true },
    });

    if (!demoRequest) {
      return NextResponse.json({ error: "Demo request not found" }, { status: 404 });
    }

    return NextResponse.json({ data: demoRequest });
  } catch (error) {
    console.error("Demo request fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validationResult = updateDemoRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const existing = await prisma.demoRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Demo request not found" }, { status: 404 });
    }

    const data = validationResult.data;
    const updateData: Record<string, unknown> = {};

    if (data.status !== undefined) updateData.status = data.status;
    if (data.preferredDate !== undefined) {
      updateData.preferredDate = data.preferredDate ? new Date(data.preferredDate) : null;
    }
    if (data.preferredTime !== undefined) updateData.preferredTime = data.preferredTime || null;
    if (data.message !== undefined) updateData.message = data.message || null;

    const updated = await prisma.demoRequest.update({
      where: { id },
      data: updateData,
      include: { lead: true },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("Demo request update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.demoRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Demo request not found" }, { status: 404 });
    }

    await prisma.demoRequest.delete({ where: { id } });

    return NextResponse.json({ message: "Demo request deleted successfully" });
  } catch (error) {
    console.error("Demo request delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}