import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalLeads,
      newLeadsToday,
      demoRequests,
      workshopRequests,
      enquiries,
      leadsByStatus,
      recentLeads,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({
        where: {
          createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      }),
      prisma.demoRequest.count(),
      prisma.workshopRequest.count(),
      prisma.enquiry.count(),
      prisma.lead.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.lead.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { demoRequests: true, workshopRequests: true } },
        },
      }),
    ]);

    return NextResponse.json({
      data: {
        stats: {
          totalLeads,
          newLeadsToday,
          demoRequests,
          workshopRequests,
          enquiries,
        },
        leadsByStatus,
        recentLeads,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}