import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <main className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-xl bg-gray-800"
          />
        ))}
      </div>
    </main>
  );
}
