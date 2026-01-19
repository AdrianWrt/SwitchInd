"use client";

import { useState } from "react";
import { Product } from "./AdminProductsClient";

export default function AdminProductRow({
  product,
  onUpdate,
  onDelete,
}: {
  product: Product;
  onUpdate?: (p: Product) => void;
  onDelete?: (id: string) => void;
}) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description || "");
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, description }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update");
      }
      const data = await res.json();
      alert("Product updated!");
      onUpdate?.(data.product);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this product?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }
      alert("Deleted!");
      onDelete?.(product.id);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <tr>
      <td className="border px-2 py-1">
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="border p-1 rounded w-full"/>
      </td>
      <td className="border px-2 py-1">
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="border p-1 rounded w-full"/>
      </td>
      <td className="border px-2 py-1">
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="border p-1 rounded w-full" placeholder="Description (optional)"/>
      </td>
      <td className="border px-2 py-1">
        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover"/>
      </td>
      <td className="border px-2 py-1 flex gap-2">
        <button onClick={handleUpdate} disabled={loading} className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-white">Update</button>
        <button onClick={handleDelete} disabled={loading} className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white">Delete</button>
      </td>
    </tr>
  );
}
