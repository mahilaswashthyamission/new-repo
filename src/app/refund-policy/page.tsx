import { Hero } from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, AlertTriangle, Clock, FileCheck, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Our refund and cancellation policy for donations.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <Hero title="Refund Policy" subtitle="Donation Refunds" />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

            <h2>General Policy</h2>
            <p>
              All donations made to NGO Organization are considered final and non-refundable. As a non-profit organization, we rely on donations to fund our programs and operations.
            </p>

            <h2>Exceptions</h2>
            <p>Refunds may be considered in the following exceptional circumstances:</p>
            <ul>
              <li>Duplicate transactions due to technical errors</li>
              <li>Unauthorized transactions</li>
              <li>Donations made by mistake with immediate notification</li>
            </ul>

            <h2>Refund Request Process</h2>
            <p>To request a refund, please:</p>
            <ol>
              <li>Contact us within 7 days of the transaction</li>
              <li>Provide your transaction ID and reason for refund</li>
              <li>Include supporting documentation if applicable</li>
            </ol>

            <h2>Processing Time</h2>
            <p>
              If your refund request is approved, it will be processed within 7-10 business days. The refund will be credited to the original payment method used for the donation.
            </p>

            <h2>Tax Receipts</h2>
            <p>
              If a donation receipt has been issued for tax purposes and a refund is processed, the receipt will be cancelled and you will be notified accordingly.
            </p>

            <h2>Contact Us</h2>
            <p>
              For refund requests or questions, please contact us at{" "}
              <a href={`mailto:${process.env.NEXT_PUBLIC_ORG_EMAIL || "help@mahilaswashthyamission.in"}`}>
                {process.env.NEXT_PUBLIC_ORG_EMAIL || "help@mahilaswashthyamission.in"}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
