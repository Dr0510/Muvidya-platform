"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Download,
  ArrowRight,
  Sparkles,
  FileText,
  Shield,
  Truck,
  HeadphonesIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string | null;
  category: string | null;
  price: number | null;
  comparePrice: number | null;
  images: string[];
  features: any;
  specifications: any;
  brochureUrl: string | null;
  inStock: boolean;
  isFeatured: boolean;
  tags: string[];
}

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

const perks = [
  {
    icon: Shield,
    title: "1 Year Warranty",
    description: "Against manufacturing defects",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹2,000",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Email, phone & WhatsApp",
  },
];

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"features" | "specs">("features");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const category = PRODUCT_CATEGORIES.find((c) => c.value === product.category);
  const gradient = category?.color || "from-primary-500 to-accent-500";

  const features = Array.isArray(product.features)
    ? (product.features as string[])
    : [];

  const specs = product.specifications
    ? (typeof product.specifications === "object"
        ? Object.entries(product.specifications as Record<string, string>)
        : [])
    : [];

  const productImages = product.images && product.images.length > 0
    ? product.images
    : [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Product Detail */}
      <SectionWrapper className="pt-12 pb-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image / Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div
                className={cn(
                  "relative h-80 lg:h-96 rounded-2xl overflow-hidden cursor-pointer group",
                  productImages.length === 0 ? `bg-gradient-to-br ${gradient}` : "bg-muted"
                )}
                onClick={() => productImages.length > 0 && openLightbox(0)}
              >
                {productImages.length > 0 ? (
                  <>
                    <Image
                      src={productImages[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-xs text-foreground shadow-sm">
                        <span className="font-medium">Click to expand</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                    <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
                        <Sparkles className="h-4 w-4" />
                        {category?.label || "Product"}
                      </div>
                      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                        {product.name}
                      </h1>
                      {product.shortDesc && (
                        <p className="text-white/80 text-lg max-w-md mx-auto">
                          {product.shortDesc}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {productImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => openLightbox(idx)}
                      className={cn(
                        "relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all hover:opacity-90",
                        idx === 0 ? "border-primary-500" : "border-transparent"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - Image ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Brochure Download */}
              {product.brochureUrl && (
                <a
                  href={product.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors w-full justify-center"
                >
                  <Download className="h-4 w-4" />
                  Download Brochure
                </a>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-muted text-muted-foreground border-border"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    product.inStock ? "bg-green-500" : "bg-red-500"
                  )}
                />
                <span className="text-sm font-medium text-foreground">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Request a Demo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold border border-border/70 bg-transparent text-foreground hover:bg-muted hover:border-foreground/20 transition-all duration-200"
                >
                  <FileText className="h-4 w-4" />
                  Enquire Now
                </a>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {perks.map((perk) => {
                  const Icon = perk.icon;
                  return (
                    <div
                      key={perk.title}
                      className="text-center p-3 rounded-xl bg-muted border border-border"
                    >
                      <Icon className="h-5 w-5 text-primary-500 mx-auto mb-1" />
                      <p className="text-xs font-semibold text-foreground">
                        {perk.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {perk.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          {(features.length > 0 || specs.length > 0) && (
            <div className="mt-16">
              <div className="flex gap-1 border-b border-border">
                {features.length > 0 && (
                  <button
                    onClick={() => setActiveTab("features")}
                    className={cn(
                      "px-6 py-3 text-sm font-medium transition-colors relative",
                      activeTab === "features"
                        ? "text-primary-600"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Features
                    {activeTab === "features" && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                      />
                    )}
                  </button>
                )}
                {specs.length > 0 && (
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={cn(
                      "px-6 py-3 text-sm font-medium transition-colors relative",
                      activeTab === "specs"
                        ? "text-primary-600"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Specifications
                    {activeTab === "specs" && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                      />
                    )}
                  </button>
                )}
              </div>

              <div className="mt-6">
                {activeTab === "features" && features.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "specs" && specs.length > 0 && (
                  <div className="border border-border rounded-xl overflow-hidden">
                    {specs.map(([key, value], idx) => (
                      <div
                        key={key}
                        className={cn(
                          "flex items-center justify-between px-6 py-3 text-sm",
                          idx % 2 === 0 ? "bg-muted" : "bg-background"
                        )}
                      >
                        <span className="font-medium text-foreground capitalize">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && productImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {productImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev === 0 ? productImages.length - 1 : prev - 1
                    );
                  }}
                  className="absolute left-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev === productImages.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="absolute right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl aspect-[4/3] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={productImages[lightboxIndex]}
                alt={`${product.name} - Image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </motion.div>

            {productImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
                {lightboxIndex + 1} / {productImages.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <SectionWrapper className="py-16 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground">
                Related Products
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Explore more products in this category
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}