"use client";

import { useState } from "react";
import { Product } from "./AdminProductsClient";

export default function AddProductForm({ onAdd }: { onAdd?: (p: Product) => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, image, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add product");
      }

      const data = await res.json();
      alert("Product added!");
      onAdd?.(data.product);

      setName("");
      setPrice(0);
      setImage("");
      setDescription("");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mb-8">
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="border p-2 rounded"/>
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} required className="border p-2 rounded"/>
      <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} required className="border p-2 rounded"/>
      <textarea placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded"/>
      <button type="submit" disabled={loading} className="bg-black text-white px-4 py-2 rounded">
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
