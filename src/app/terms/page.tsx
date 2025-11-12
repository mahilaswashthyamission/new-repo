import { Hero } from "@/components/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using our website and services.",
};

export default function TermsPage() {
  return (
    <>
      <Hero title="Terms & Conditions" subtitle="Legal Terms" />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use this website.
            </p>

            <h2>Use of Website</h2>
            <p>You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the website.</p>

            <h2>Donations</h2>
            <p>
              All donations are voluntary and non-refundable except as outlined in our Refund Policy. Donations are used to support our programs and operational costs.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The content, organization, graphics, design, and other matters related to this website are protected under applicable copyrights and other proprietary laws. Copying, redistribution, or publication of any such matters is strictly prohibited.
            </p>

            <h2>User Content</h2>
            <p>
              By submitting content to our website (including forms, comments, or applications), you grant us a non-exclusive, royalty-free license to use, reproduce, and distribute such content in connection with our services.
            </p>

            <h2>Disclaimer</h2>
            <p>
              This website and its content are provided "as is" without any representations or warranties. We do not warrant that the website will be uninterrupted or error-free.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              NGO Organization shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of this website.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these terms, please contact us at{" "}
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
