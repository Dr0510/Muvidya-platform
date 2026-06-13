"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCardSkeleton } from "@/components/ui/skeleton";
import { Users, CalendarCheck, Wrench, MessageSquare, TrendingUp, Activity } from "lucide-react";
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS } from "@/lib/constants";
import { format } from "date-fns";

interface DashboardData {
  stats: {
    totalLeads: number;
    newLeadsToday: number;
    demoRequests: number;
    workshopRequests: number;
    enquiries: number;
  };
  leadsByStatus: { status: string; _count: number }[];
  recentLeads: any[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <StatsCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const statsCards = [
    { label: "Total Leads", value: data?.stats.totalLeads, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "New Today", value: data?.stats.newLeadsToday, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Demo Requests", value: data?.stats.demoRequests, icon: CalendarCheck, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Workshop Requests", value: data?.stats.workshopRequests, icon: Wrench, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Enquiries", value: data?.stats.enquiries, icon: MessageSquare, color: "text-cyan-600", bg: "bg-cyan-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your MuVidya platform activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    <Activity className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value || 0}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lead Status Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.leadsByStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <Badge variant="default" className={LEAD_STATUS_COLORS[item.status] || ""}>
                    {LEAD_STATUS_LABELS[item.status] || item.status}
                  </Badge>
                  <span className="text-sm font-semibold text-gray-900">{item._count}</span>
                </div>
              ))}
              {(!data?.leadsByStatus || data.leadsByStatus.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-8">No leads yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.recentLeads.map((lead: any) => (
                <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="default" className={LEAD_STATUS_COLORS[lead.status] || ""}>
                      {LEAD_STATUS_LABELS[lead.status] || lead.status}
                    </Badge>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {format(new Date(lead.createdAt), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
              ))}
              {(!data?.recentLeads || data.recentLeads.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-8">No recent leads</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}