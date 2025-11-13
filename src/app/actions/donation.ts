"use server";

import { writeClient } from "@/lib/sanity";
import { sendEmail } from "@/lib/email";
import { generateReceipt } from "@/lib/receipt";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    console.log("🎁 Processing donation for:", data.donorName);
    
    // Verify Razorpay signature
    const isValid = verifyRazorpaySignature(data.orderId, data.paymentId, data.signature);

    if (!isValid) {
      console.error("❌ Invalid payment signature");
      return { success: false, error: "Invalid payment signature" };
    }

    console.log("✅ Payment signature verified");

    // Create donation record in Supabase
    console.log("💾 Saving to Supabase...");
    const { data: supabaseDonation, error: supabaseError } = await supabase
      .from("donations")
      .insert({
        donor_name: data.donorName,
        email: data.email,
        phone: data.phone,
        amount: data.amount,
        pan: data.pan,
        transaction_id: data.paymentId,
        order_id: data.orderId,
        payment_status: "success",
      })
      .select()
      .single();

    if (supabaseError) {
      console.error("❌ Supabase error:", supabaseError);
      throw new Error("Failed to save donation to database");
    }

    console.log("✅ Saved to Supabase");

    // Create donation record in Sanity (for CMS)
    console.log("💾 Saving to Sanity...");
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

    console.log("✅ Saved to Sanity");

    // Generate and send receipt email (non-blocking)
    try {
      const receiptBuffer = generateReceipt({
        donorName: data.donorName,
        email: data.email,
        phone: data.phone,
        amount: data.amount,
        transactionId: data.paymentId,
        date: new Date().toLocaleDateString("en-IN"),
      });

      // Send receipt email
      const emailResult = await sendEmail({
        to: data.email,
        subject: "Donation Receipt - Mahila Swashthya Mission",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Mahila Swashthya Mission</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Donation Receipt</p>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1f2937; margin-top: 0;">Thank You for Your Generous Donation!</h2>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Dear <strong>${data.donorName}</strong>,</p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                We are deeply grateful for your donation of <strong style="color: #3b82f6; font-size: 20px;">₹${data.amount.toLocaleString("en-IN")}</strong>.
              </p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0; color: #4b5563;"><strong>Transaction ID:</strong> ${data.paymentId}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Date:</strong> ${new Date().toLocaleDateString("en-IN")}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Payment Mode:</strong> Online (Razorpay)</p>
              </div>
              
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
                Please find your official donation receipt attached to this email. This receipt is eligible for tax deduction under Section 80G of the Income Tax Act.
              </p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Your support helps us continue our mission to create positive change and empower communities.
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">Best regards,</p>
                <p style="color: #1f2937; font-size: 16px; font-weight: bold; margin: 5px 0;">Mahila Swashthya Mission</p>
                <p style="color: #6b7280; font-size: 13px; margin: 5px 0;">Shop no. 14 Mahajan complex, sector 4B, avas vikas, sikandra, agra - 282007</p>
                <p style="color: #6b7280; font-size: 13px; margin: 5px 0;">Email: help@mahilaswashthyamission.in | Phone: +91 95575 13058</p>
              </div>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: `receipt_${data.paymentId}.pdf`,
            content: Buffer.from(receiptBuffer),
          },
        ],
      });

      // Update receipt_sent status in Supabase
      if (emailResult.success) {
        await supabase
          .from("donations")
          .update({ receipt_sent: true })
          .eq("transaction_id", data.paymentId);
      }
    } catch (emailError) {
      console.error("Email sending error (non-critical):", emailError);
      // Don't fail the donation if email fails
    }

    console.log("🎉 Donation processed successfully!");
    console.log("📊 Donation saved to database with ID:", supabaseDonation?.id);
    return { 
      success: true, 
      data: { supabase: supabaseDonation, sanity: donation },
      message: "Donation successful! Receipt will be emailed shortly."
    };
  } catch (error: any) {
    console.error("❌ Donation error:", error);
    return { success: false, error: error.message || "Failed to process donation" };
  }
}
