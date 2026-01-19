"use client";
import { useCart } from "@/context/CartContext";

console.log("Server Key:", process.env.MIDTRANS_SERVER_KEY);
console.log("Client Key:", process.env.MIDTRANS_CLIENT_KEY);


export default function CheckoutClient() {
  const { items, clearCart } = useCart();

  async function handleCheckout() {
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Payment failed");
        return;
      }

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert("Payment session not created");
      }
    } catch (err: any) {
      alert(err.message || "Payment failed");
    }
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <button
        onClick={handleCheckout}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
      >
        Proceed to Payment
      </button>
    </main>
  );
}
