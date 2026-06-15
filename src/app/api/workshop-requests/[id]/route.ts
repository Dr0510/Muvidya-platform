import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const updateSchema = z.object({
  status: z.string().min(1).max(50).optional(),
  preferredDate: z.string().optional().or(z.literal("")),
  duration: z.string().max(50).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const req = await prisma.workshopRequest.findUnique({
      where: { id },
      include: { lead: true },
    });

    if (!req) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ data: req });
  } catch (error) {
    console.error("Workshop request fetch error:", error);
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
    const result = updateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      );
    }

    const existing = await prisma.workshopRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = result.data;
    const updateData: Record<string, unknown> = {};

    if (data.status !== undefined) updateData.status = data.status;
    if (data.preferredDate !== undefined) {
      updateData.preferredDate = data.preferredDate ? new Date(data.preferredDate) : null;
    }
    if (data.duration !== undefined) updateData.duration = data.duration || null;
    if (data.message !== undefined) updateData.message = data.message || null;

    const updated = await prisma.workshopRequest.update({
      where: { id },
      data: updateData,
      include: { lead: true },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("Workshop request update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.workshopRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.workshopRequest.delete({ where: { id } });
    return NextResponse.json({ message: "Workshop request deleted" });
  } catch (error) {
    console.error("Workshop request delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}