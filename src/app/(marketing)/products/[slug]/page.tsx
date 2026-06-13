import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductDetailClient } from "./product-detail-client";
import { ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    return product ? JSON.parse(JSON.stringify(product)) : null;
  } catch {
    return null;
  }
}

async function getRelatedProducts(category: string | null, excludeId: string) {
  if (!category) return [];
  try {
    const products = await prisma.product.findMany({
      where: { category, id: { not: excludeId } },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
    return JSON.parse(JSON.stringify(products));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.shortDesc || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDesc || product.description,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 h-12 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/products"
              className="hover:text-primary-600 transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}