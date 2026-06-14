"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  StarOff,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

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
  inStock: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const product = products.find((p) => p.id === id);
      if (!product) return;
      const res = await fetch(`/api/products/${product.slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const toggleFeatured = async (product: Product) => {
    try {
      const res = await fetch(`/api/products/${product.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !product.isFeatured }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, isFeatured: !p.isFeatured } : p
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle featured:", err);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your STEM product catalog
          </p>
        </div>
        <Button
          onClick={() => router.push("/admin/products")}
          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-background border-border max-w-md"
        />
      </div>

      {loading ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Package className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {search ? "No products found" : "No products yet"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {search
              ? "Try a different search term"
              : "Add your first product to get started"}
          </p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Created</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((product) => {
                  const category = PRODUCT_CATEGORIES.find(
                    (c) => c.value === product.category
                  );
                  return (
                    <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center text-white text-xs font-bold", category?.color ? `bg-gradient-to-br ${category.color}` : "bg-gradient-to-br from-primary-500 to-accent-500")}>
                            {product.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">{product.name}</span>
                              {product.isFeatured && (
                                <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px]">Featured</Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{product.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="bg-muted text-muted-foreground border-border">
                          {category?.label || product.category || "General"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={cn("h-2 w-2 rounded-full", product.inStock ? "bg-green-500" : "bg-red-500")} />
                          <span className="text-sm text-muted-foreground">{product.inStock ? "In Stock" : "Out of Stock"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{formatDate(product.createdAt)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => toggleFeatured(product)}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-amber-500 transition-colors"
                            title={product.isFeatured ? "Remove featured" : "Mark as featured"}
                          >
                            {product.isFeatured ? (
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => router.push(`/admin/products/${product.slug}`)}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(product.id)}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Delete Product</h3>
                  <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(deleteId)} disabled={deleting}>
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}