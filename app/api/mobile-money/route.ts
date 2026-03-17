import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await axios.post(
      "https://api.flutterwave.cloud/charges",
      {
        amount: body.amount,
        currency: "GHS",
        email: body.email,
        tx_ref: `tx-${Date.now()}`,
        mobile_money: {
          phone_number: body.phone,
          network: body.network, // MTN | VODAFONE | AIRTELTIGO
          country_code: "GH",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json(
      { error: "Payment initiation failed" },
      { status: 500 },
    );
  }
}
