"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Download, Search, Users } from "lucide-react";
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS, LEAD_SOURCES } from "@/lib/constants";
import { format } from "date-fns";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("limit", "100");
      
      const res = await fetch(`/api/leads?${params}`);
      const data = await res.json();
      setLeads(data.data || []);
      setLoading(false);
    };
    
    fetchLeads();
  }, [search]);

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "School", "Source", "Status", "Created"];
    const rows = leads.map((l: any) => [
      l.name, l.email, l.phone || "", l.company || "", l.source || "", l.status,
      format(new Date(l.createdAt), "yyyy-MM-dd"),
    ]);
    
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all your leads</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 text-primary-700 text-sm font-semibold hover:bg-primary-100 transition-colors"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search leads by name, email, or school..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="secondary" className="gap-1">
              <Users className="h-3 w-3" />
              {leads.length} total
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton rows={8} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">Name</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">Email</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">School</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">Source</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">Status</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead: any) => (
                    <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-2 font-medium text-gray-900">{lead.name}</td>
                      <td className="py-3 px-2 text-gray-600">{lead.email}</td>
                      <td className="py-3 px-2 text-gray-600">{lead.company || "-"}</td>
                      <td className="py-3 px-2 text-gray-600">{lead.source || "website"}</td>
                      <td className="py-3 px-2">
                        <Badge variant="default" className={LEAD_STATUS_COLORS[lead.status] || ""}>
                          {LEAD_STATUS_LABELS[lead.status] || lead.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-gray-500 text-xs">
                        {format(new Date(lead.createdAt), "MMM d, yyyy")}
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-gray-500">No leads found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}