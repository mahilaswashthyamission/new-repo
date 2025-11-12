import { Hero } from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using our website and services.",
};

export default function TermsPage() {
  return (
    <>
      <Hero 
        title="Terms & Conditions" 
        subtitle="Legal Agreement"
        description="Please read these terms carefully before using our services"
      />

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Last Updated:</strong> {new Date().toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      These Terms and Conditions govern your use of the Mahila Swashth Mission website and services. 
                      By accessing or using our website, you agree to be bound by these terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      By accessing and using the Mahila Swashth Mission website (&quot;the Website&quot;), you acknowledge 
                      that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not 
                      agree with any part of these terms, you must not use our website or services.
                    </p>
                    <p>
                      These terms apply to all visitors, users, and others who access or use the Website, including but 
                      not limited to donors, volunteers, members, and beneficiaries.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">2. Use of Website</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>You agree to use this website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Use the Website in any way that violates applicable laws or regulations</li>
                      <li>Engage in any conduct that restricts or inhibits anyone&apos;s use of the Website</li>
                      <li>Transmit any harmful code, viruses, or malicious software</li>
                      <li>Attempt to gain unauthorized access to any portion of the Website</li>
                      <li>Use automated systems to access the Website without our express permission</li>
                      <li>Impersonate or misrepresent your affiliation with any person or organization</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">3. Donations and Contributions</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      All donations made through our Website are voluntary contributions to support our mission and programs. 
                      By making a donation, you agree to the following:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Donations are generally non-refundable except as outlined in our Refund Policy</li>
                      <li>Donations will be used to support our programs, operations, and charitable activities</li>
                      <li>You will receive a receipt for tax purposes as per applicable laws</li>
                      <li>We reserve the right to use donations where they are most needed</li>
                      <li>All payment information is processed securely through authorized payment gateways</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">4. Intellectual Property Rights</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      The Website and its entire contents, features, and functionality (including but not limited to all 
                      information, software, text, displays, images, video, and audio) are owned by Mahila Swashth Mission 
                      and are protected by Indian and international copyright, trademark, and other intellectual property laws.
                    </p>
                    <p>You may not:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Reproduce, distribute, or create derivative works from our content without permission</li>
                      <li>Use our name, logo, or trademarks without written authorization</li>
                      <li>Remove or alter any copyright, trademark, or proprietary notices</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">5. User-Generated Content</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      By submitting any content to our Website (including registration forms, contact forms, comments, or 
                      applications), you grant Mahila Swashth Mission a non-exclusive, royalty-free, perpetual, and worldwide 
                      license to use, reproduce, modify, and distribute such content for our charitable purposes.
                    </p>
                    <p>You represent and warrant that:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>You own or have the necessary rights to submit the content</li>
                      <li>The content does not violate any third-party rights</li>
                      <li>The content is accurate and not misleading</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <h2 className="text-2xl font-bold">6. Disclaimer of Warranties</h2>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      The Website and all information, content, materials, and services included on or otherwise made 
                      available through the Website are provided on an &quot;as is&quot; and &quot;as available&quot; basis. 
                      Mahila Swashth Mission makes no representations or warranties of any kind, express or implied, regarding:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>The operation or availability of the Website</li>
                      <li>The accuracy, completeness, or reliability of any content</li>
                      <li>That the Website will be uninterrupted, secure, or error-free</li>
                      <li>That defects will be corrected</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      To the fullest extent permitted by applicable law, Mahila Swashth Mission shall not be liable for any 
                      indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
                      whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses 
                      resulting from:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Your access to or use of (or inability to access or use) the Website</li>
                      <li>Any conduct or content of any third party on the Website</li>
                      <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">8. Modifications to Terms</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      We reserve the right to modify or replace these Terms at any time at our sole discretion. We will 
                      provide notice of any material changes by updating the &quot;Last Updated&quot; date at the top of 
                      this page. Your continued use of the Website following the posting of changes constitutes your 
                      acceptance of such changes.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">9. Governing Law and Jurisdiction</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of India, without regard 
                      to its conflict of law provisions. Any disputes arising out of or relating to these Terms or the 
                      Website shall be subject to the exclusive jurisdiction of the courts located in [Your City], India.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      If you have any questions, concerns, or requests regarding these Terms and Conditions, please contact us:
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg mt-4">
                      <p><strong>Mahila Swashth Mission</strong></p>
                      <p className="mt-2">
                        Email: <a href={`mailto:${process.env.NEXT_PUBLIC_ORG_EMAIL || "info@ngo.org"}`} className="text-primary hover:underline">
                          {process.env.NEXT_PUBLIC_ORG_EMAIL || "info@ngo.org"}
                        </a>
                      </p>
                      <p>Phone: {process.env.NEXT_PUBLIC_ORG_PHONE || "+91 98765 43210"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
