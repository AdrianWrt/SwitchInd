import { prisma } from "@/lib/prisma";
import ProductDetailsClient from "./ProductDetailsClient";
import Link from "next/link";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({
  params,

}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params

  if (!id) {
    return (
      <main className="p-12 bg-gray-900 text-white text-center">
        <h1 className="text-3xl font-bold">Product ID missing</h1>
        <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
          Back to Home
        </Link>
      </main>
    );
  }

  const numericId = Number(id);
  const isNumericId = !isNaN(numericId);

  const product = await prisma.product.findUnique({
    where: isNumericId ? { id: numericId } : { id },
  });

  if (!product) {
    return (
      <main className="p-12 bg-gray-900 text-white text-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
          Back to Home
        </Link>
      </main>
    );
  }

  return <ProductDetailsClient product={product} />;
}
