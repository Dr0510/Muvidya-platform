"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

interface ProductCardProps {
  product: {
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
    inStock: boolean;
    isFeatured: boolean;
    tags: string[];
  };
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const category = PRODUCT_CATEGORIES.find(c => c.value === product.category);
  const gradient = category?.color || "from-primary-500 to-accent-500";
  const hasImage = product.images && product.images.length > 0;
  const imageSrc = hasImage ? product.images[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="group h-full overflow-hidden hover:shadow-elevation-high transition-all duration-300">
        <div className={`relative h-48 overflow-hidden ${!imageSrc ? `bg-gradient-to-br ${gradient}` : "bg-muted"}`}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
          )}
          {/* Gradient overlay at bottom for readability */}
          {imageSrc && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          )}
          <div className="relative z-10 p-4 flex items-start justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-foreground/80 text-xs font-medium shadow-sm">
              <Sparkles className="h-3 w-3 text-primary-500" />
              {category?.label || product.category || "General"}
            </div>
            {product.isFeatured && (
              <Badge variant="default" className="bg-amber-500 text-white border-0">
                Featured
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.shortDesc || product.description}
          </p>
          
          {Array.isArray(product.features) && product.features.length > 0 && (
            <ul className="space-y-2 mb-4">
              {(product.features as string[]).slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {!product.inStock && (
            <Badge variant="outline" className="mb-3 border-red-200 text-red-600 bg-red-50">
              Out of Stock
            </Badge>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-border/60">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-600 transition-colors group/link"
            >
              View Details
              <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="sm" className="text-xs">
                Enquire Now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
