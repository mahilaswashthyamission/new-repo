import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials not configured");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Log environment variables (without exposing secrets)
    console.log("Razorpay Key ID exists:", !!process.env.RAZORPAY_KEY_ID);
    console.log("Razorpay Key Secret exists:", !!process.env.RAZORPAY_KEY_SECRET);
    console.log("Key ID prefix:", process.env.RAZORPAY_KEY_ID?.substring(0, 8));

    // Get Razorpay instance
    const razorpay = getRazorpayInstance();

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        purpose: "Donation",
      },
    };

    console.log("Creating order with amount:", options.amount);
    const order = await razorpay.orders.create(options);
    console.log("Order created successfully:", order.id);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error: any) {
    console.error("Order creation error details:", {
      message: error.message,
      description: error.error?.description,
      code: error.error?.code,
      statusCode: error.statusCode,
      fullError: error
    });
    return NextResponse.json(
      { 
        error: error.error?.description || error.message || "Failed to create order",
        code: error.error?.code || "UNKNOWN_ERROR"
      },
      { status: 500 }
    );
  }
}
