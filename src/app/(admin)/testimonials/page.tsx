"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Plus, Star, Quote, Video as VideoIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    school: "",
    content: "",
    rating: 5,
    type: "text",
    videoUrl: "",
    sortOrder: 0,
  });

  const fetchTestimonials = async () => {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(data.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success("Testimonial created!");
      setShowForm(false);
      setForm({ name: "", role: "", school: "", content: "", rating: 5, type: "text", videoUrl: "", sortOrder: 0 });
      fetchTestimonials();
    } else {
      toast.error("Failed to create testimonial");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage customer testimonials and reviews</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">School/Institution</label>
                  <Input value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <Select value={String(form.rating)} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option value="text">Text</option>
                    <option value="video">Video</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <Input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              {form.type === "video" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Video URL</label>
                  <Input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Content *</label>
                <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} required />
              </div>
              <div className="flex gap-3">
                <Button type="submit">Save</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Testimonials ({testimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton rows={5} />
          ) : testimonials.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No testimonials yet</p>
          ) : (
            <div className="space-y-4">
              {testimonials.map((t: any) => (
                <div key={t.id} className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-muted/30">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {t.type === "video" ? <VideoIcon className="h-5 w-5" /> : <Quote className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-foreground">{t.name}</span>
                      {t.role && <span className="text-sm text-muted-foreground">— {t.role}</span>}
                      {t.school && <span className="text-xs text-muted-foreground/60">({t.school})</span>}
                      <Badge variant={t.type === "video" ? "default" : "secondary"} className="ml-auto">{t.type}</Badge>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{t.content}</p>
                    {t.videoUrl && (
                      <a href={t.videoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">
                        Watch video →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}