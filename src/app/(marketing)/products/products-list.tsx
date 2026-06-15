"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/products/product-card";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal, X } from "lucide-react";

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
  inStock: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

interface ProductsListProps {
  initialProducts: Product[];
}

export function ProductsList({ initialProducts }: ProductsListProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("newest");

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    switch (sort) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      default: // newest
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [initialProducts, search, selectedCategory, sort]);

  const hasFilters = search || selectedCategory;

  return (
    <SectionWrapper className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our STEM Products"
          subtitle="Comprehensive learning platforms, modules, and accessories designed for hands-on STEM education"
        />

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border/70"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 pl-10 pr-8 rounded-xl border border-border/70 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                !selectedCategory
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground hover:bg-surface-muted border border-border/70"
              )}
            >
              All
            </button>
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.value ? null : cat.value
                  )
                }
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  selectedCategory === cat.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground hover:bg-surface-muted border border-border/70"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              No products found
            </h3>
            <p className="text-sm text-muted-foreground">
              {hasFilters
                ? "Try adjusting your search or filter criteria"
                : "Products will appear here once added"}
            </p>
            {hasFilters && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory(null);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
              {selectedCategory
                ? ` in ${
                    PRODUCT_CATEGORIES.find((c) => c.value === selectedCategory)
                      ?.label || selectedCategory
                  }`
                : ""}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}