"use server";

import { writeClient } from "@/lib/sanity";
import { sendEmail } from "@/lib/email";
import { generateReceipt } from "@/lib/receipt";
import { verifyRazorpaySignature } from "@/lib/razorpay";

export async function createDonation(data: {
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  pan?: string;
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  try {
    // Verify Razorpay signature
    const isValid = verifyRazorpaySignature(data.orderId, data.paymentId, data.signature);

    if (!isValid) {
      return { success: false, error: "Invalid payment signature" };
    }

    // Create donation record in Sanity
    const donation = await writeClient.create({
      _type: "donation",
      donorName: data.donorName,
      email: data.email,
      phone: data.phone,
      amount: data.amount,
      pan: data.pan,
      transactionId: data.paymentId,
      orderId: data.orderId,
      paymentStatus: "success",
      createdAt: new Date().toISOString(),
    });

    // Generate receipt
    const receiptBuffer = generateReceipt({
      donorName: data.donorName,
      email: data.email,
      phone: data.phone,
      amount: data.amount,
      transactionId: data.paymentId,
      date: new Date().toLocaleDateString("en-IN"),
    });

    // Send receipt email
    await sendEmail({
      to: data.email,
      subject: "Donation Receipt - Mahila Swashth Mission",
      html: `
        <h2>Thank you for your generous donation!</h2>
        <p>Dear ${data.donorName},</p>
        <p>We have received your donation of ₹${data.amount.toLocaleString("en-IN")}.</p>
        <p>Your transaction ID is: ${data.paymentId}</p>
        <p>Please find your receipt attached.</p>
        <p>Your support helps us continue our mission to create positive change.</p>
        <p>Best regards,<br>Mahila Swashth Mission</p>
      `,
      attachments: [
        {
          filename: `receipt_${data.paymentId}.pdf`,
          content: Buffer.from(receiptBuffer),
        },
      ],
    });

    return { success: true, data: donation };
  } catch (error) {
    console.error("Donation error:", error);
    return { success: false, error: "Failed to process donation" };
  }
}
