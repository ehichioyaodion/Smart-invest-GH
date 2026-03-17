import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();

  console.log("Webhook received:", payload);

  // ✅ verify transaction here
  // ✅ update order status in DB

  return NextResponse.json({ received: true });
}
