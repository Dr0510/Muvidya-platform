"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/skeleton";
import { CalendarCheck } from "lucide-react";
import { format } from "date-fns";

export default function DemoRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/demo-requests")
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
        <h1 className="text-2xl font-bold text-gray-900">Demo Requests</h1>
        <p className="text-sm text-gray-500 mt-1">Manage incoming demo requests from schools</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-primary-500" />
            <CardTitle className="text-lg">All Demo Requests</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton rows={5} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">Name</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">School</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">City</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">Grade</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">Subject</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req: any) => (
                    <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-2 font-medium text-gray-900">{req.lead?.name}</td>
                      <td className="py-3 px-2 text-gray-600">{req.schoolName || "-"}</td>
                      <td className="py-3 px-2 text-gray-600">{req.city || "-"}</td>
                      <td className="py-3 px-2">{req.gradeLevel || "-"}</td>
                      <td className="py-3 px-2">{req.subjectArea || "-"}</td>
                      <td className="py-3 px-2 text-gray-500 text-xs">
                        {format(new Date(req.createdAt), "MMM d, yyyy")}
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-gray-500">No demo requests yet</td>
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