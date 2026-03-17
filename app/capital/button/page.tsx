"use client";

import { useState } from "react";

export default function PayButton() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/mobile-money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 10,
          email: "customer@email.com",
          phone: "024XXXXXXX",
          network: "MTN", // Ghana networks
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("Payment prompt sent to customer's phone");
      } else {
        alert("Payment failed to start");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="px-6 py-3 bg-green-600 text-white rounded-lg"
    >
      {loading ? "Processing..." : "Pay with Mobile Money"}
    </button>
  );
}
