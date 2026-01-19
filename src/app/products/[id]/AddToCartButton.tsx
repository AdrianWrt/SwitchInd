"use client";

import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function AddToCartButton({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  const { addToCart } = useCart();

  function handleAdd() {
    addToCart({ ...product, quantity });
    alert(`${quantity} x ${product.name} added to cart`);
  }

  return (
    <button
      onClick={handleAdd}
      className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold transition"
    >
      Add to Cart
    </button>
  );
}
