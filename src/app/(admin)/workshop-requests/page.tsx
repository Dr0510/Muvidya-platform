"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Wrench } from "lucide-react";
import { format } from "date-fns";

export default function WorkshopRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/workshop-requests")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Workshop Requests</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage incoming workshop enquiries from schools</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-orange-500" />
            <CardTitle className="text-lg">All Workshop Enquiries</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton rows={5} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">School</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Workshop</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Grade</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Duration</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Students</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req: any) => (
                    <tr key={req.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2 font-medium text-foreground">{req.lead?.name}</td>
                      <td className="py-3 px-2 text-muted-foreground">{req.schoolName || "-"}</td>
                      <td className="py-3 px-2 text-muted-foreground">{req.workshopType || "-"}</td>
                      <td className="py-3 px-2">{req.gradeLevel || "-"}</td>
                      <td className="py-3 px-2">{req.duration || "-"}</td>
                      <td className="py-3 px-2">{req.studentCount || "-"}</td>
                      <td className="py-3 px-2 text-muted-foreground text-xs">
                        {format(new Date(req.createdAt), "MMM d, yyyy")}
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-muted-foreground">No workshop requests yet</td>
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