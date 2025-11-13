import { NextRequest, NextResponse } from "next/server";
import { generateReceipt } from "@/lib/receipt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donorName, email, phone, amount, transactionId, date } = body;

    if (!donorName || !email || !amount || !transactionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate receipt PDF
    const receiptBuffer = generateReceipt({
      donorName,
      email,
      phone,
      amount,
      transactionId,
      date: date || new Date().toLocaleDateString("en-IN"),
    });

    // Return PDF as downloadable file
    return new NextResponse(receiptBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="donation_receipt_${transactionId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Receipt generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate receipt" },
      { status: 500 }
    );
  }
}
