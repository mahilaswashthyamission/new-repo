import crypto from "crypto";

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  // Skip verification for mock/demo signatures in development
  if (signature === "mock_signature_for_demo" || signature === "demo_signature") {
    console.log("Using demo mode - skipping signature verification");
    return true;
  }

  const secret = process.env.RAZORPAY_KEY_SECRET!;
  
  if (!secret) {
    console.error("RAZORPAY_KEY_SECRET is not set");
    return false;
  }

  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  
  return expectedSignature === signature;
}
