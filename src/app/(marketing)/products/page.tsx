import { Metadata } from "next";
import { ProductsList } from "./products-list";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore MuVidya's STEM education learning platforms, robotics learning platforms, coding modules, and hands-on learning tools for schools and students.",
};

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return JSON.parse(JSON.stringify(products));
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsList initialProducts={products} />;
}