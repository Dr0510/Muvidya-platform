"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";
import { format } from "date-fns";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/enquiries")
      .then((res) => res.json())
      .then((data) => {
        setEnquiries(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Enquiries</h1>
        <p className="text-sm text-muted-foreground mt-1">View and respond to contact form enquiries</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-cyan-500" />
            <CardTitle className="text-lg">All Enquiries</CardTitle>
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
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Message</th>
                    <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq: any) => (
                    <tr key={enq.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2 font-medium text-foreground">{enq.lead?.name}</td>
                      <td className="py-3 px-2 text-muted-foreground">{enq.lead?.email}</td>
                      <td className="py-3 px-2 text-muted-foreground max-w-[200px] truncate">{enq.subject}</td>
                      <td className="py-3 px-2 text-muted-foreground max-w-[300px] truncate">{enq.message}</td>
                      <td className="py-3 px-2 text-muted-foreground text-xs whitespace-nowrap">
                        {format(new Date(enq.createdAt), "MMM d, yyyy")}
                      </td>
                    </tr>
                  ))}
                  {enquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-muted-foreground">No enquiries yet</td>
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