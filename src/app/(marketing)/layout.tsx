import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <main className="min-h-screen pt-16 lg:pt-[72px]">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}