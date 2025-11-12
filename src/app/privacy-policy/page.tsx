import { Hero } from "@/components/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy and how we handle your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero title="Privacy Policy" subtitle="Your Privacy Matters" />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

            <h2>Introduction</h2>
            <p>
              NGO Organization ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Donation and payment information</li>
              <li>Membership registration details</li>
              <li>Communication preferences</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process donations and issue receipts</li>
              <li>Communicate about our programs and activities</li>
              <li>Respond to your inquiries and requests</li>
              <li>Improve our services and website</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our activities, subject to confidentiality agreements.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href={`mailto:${process.env.NEXT_PUBLIC_ORG_EMAIL || "info@ngo.org"}`}>
                {process.env.NEXT_PUBLIC_ORG_EMAIL || "info@ngo.org"}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
