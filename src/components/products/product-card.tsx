"use client";

import Link from "next/link";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="group h-full overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 border-gray-100">
        <div className={`relative h-48 bg-gradient-to-br ${gradient} p-6 flex items-center justify-center`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-3">
              <Sparkles className="h-3 w-3" />
              {category?.label || product.category || "General"}
            </div>
            {product.isFeatured && (
              <Badge variant="default" className="bg-amber-500 text-white border-0 ml-2">
                Featured
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {product.shortDesc || product.description}
          </p>
          
          {Array.isArray(product.features) && product.features.length > 0 && (
            <ul className="space-y-2 mb-4">
              {(product.features as string[]).slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
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

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group/link"
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