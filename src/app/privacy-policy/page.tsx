import { Hero } from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Eye, Shield, UserCheck, Database, Bell } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy and how we handle your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero 
        title="Privacy Policy" 
        subtitle="Your Privacy Matters"
        description="Learn how we collect, use, and protect your personal information"
      />

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Lock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Last Updated:</strong> {new Date().toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Mahila Swashth Mission is committed to protecting your privacy and ensuring the security of your 
                      personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                      your data when you visit our website or use our services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Database className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Personal Information You Provide</h3>
                      <p className="mb-2">We collect information that you voluntarily provide to us, including:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Name, email address, and phone number</li>
                        <li>Mailing address and city of residence</li>
                        <li>Donation and payment information</li>
                        <li>Membership registration details</li>
                        <li>Job application information and resumes</li>
                        <li>Communication preferences and feedback</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                      <p className="mb-2">When you visit our website, we may automatically collect:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>IP address and browser type</li>
                        <li>Device information and operating system</li>
                        <li>Pages visited and time spent on our website</li>
                        <li>Referring website addresses</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Eye className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>We use the information we collect for the following purposes:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Process Donations:</strong> To process your contributions and issue tax receipts</li>
                      <li><strong>Program Communication:</strong> To inform you about our programs, events, and impact</li>
                      <li><strong>Member Services:</strong> To manage memberships and provide member benefits</li>
                      <li><strong>Respond to Inquiries:</strong> To answer your questions and provide support</li>
                      <li><strong>Improve Services:</strong> To enhance our website, programs, and user experience</li>
                      <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                      <li><strong>Recruitment:</strong> To process job applications and evaluate candidates</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <h2 className="text-2xl font-bold">3. Information Sharing and Disclosure</h2>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      We respect your privacy and do not sell, trade, or rent your personal information to third parties. 
                      We may share your information only in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in 
                      operating our website, processing payments, or conducting our activities, subject to strict 
                      confidentiality agreements</li>
                      <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                      <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of 
                      our users or the public</li>
                      <li><strong>With Your Consent:</strong> When you have given us explicit permission to share your information</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      We implement appropriate technical and organizational security measures to protect your personal 
                      information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Secure Socket Layer (SSL) encryption for data transmission</li>
                      <li>Secure payment processing through authorized payment gateways</li>
                      <li>Regular security assessments and updates</li>
                      <li>Restricted access to personal information on a need-to-know basis</li>
                      <li>Employee training on data protection and privacy</li>
                    </ul>
                    <p className="mt-3">
                      However, no method of transmission over the internet or electronic storage is 100% secure. While 
                      we strive to protect your personal information, we cannot guarantee its absolute security.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking Technologies</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      We use cookies and similar tracking technologies to enhance your experience on our website. 
                      Cookies are small data files stored on your device that help us:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Remember your preferences and settings</li>
                      <li>Understand how you use our website</li>
                      <li>Improve website functionality and performance</li>
                      <li>Provide relevant content and communications</li>
                    </ul>
                    <p className="mt-3">
                      You can control cookies through your browser settings. However, disabling cookies may affect 
                      your ability to use certain features of our website.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      We retain your personal information for as long as necessary to fulfill the purposes outlined in 
                      this Privacy Policy, unless a longer retention period is required or permitted by law. When we no 
                      longer need your information, we will securely delete or anonymize it.
                    </p>
                    <p>
                      Donation records and financial information are retained in accordance with applicable tax laws 
                      and accounting requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <UserCheck className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <h2 className="text-2xl font-bold">7. Your Rights and Choices</h2>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>You have the following rights regarding your personal information:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                      <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                      <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal requirements</li>
                      <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                      <li><strong>Data Portability:</strong> Request a copy of your data in a structured format</li>
                      <li><strong>Withdraw Consent:</strong> Withdraw your consent for data processing where applicable</li>
                    </ul>
                    <p className="mt-3">
                      To exercise any of these rights, please contact us using the information provided below.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Bell className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <h2 className="text-2xl font-bold">8. Changes to This Privacy Policy</h2>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      We may update this Privacy Policy from time to time to reflect changes in our practices or for 
                      legal, operational, or regulatory reasons. We will notify you of any material changes by updating 
                      the &quot;Last Updated&quot; date at the top of this page.
                    </p>
                    <p>
                      We encourage you to review this Privacy Policy periodically to stay informed about how we protect 
                      your information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">9. Children&apos;s Privacy</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      Our website is not intended for children under the age of 13. We do not knowingly collect personal 
                      information from children under 13. If you are a parent or guardian and believe your child has 
                      provided us with personal information, please contact us immediately.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                      please contact us:
                    </p>
                    <div className="bg-background p-4 rounded-lg mt-4">
                      <p className="font-semibold text-foreground">Mahila Swashth Mission</p>
                      <p className="mt-2">
                        <strong>Email:</strong>{" "}
                        <a 
                          href={`mailto:${process.env.NEXT_PUBLIC_ORG_EMAIL || "help@mahilaswashthyamission.in"}`}
                          className="text-primary hover:underline"
                        >
                          {process.env.NEXT_PUBLIC_ORG_EMAIL || "help@mahilaswashthyamission.in"}
                        </a>
                      </p>
                      <p>
                        <strong>Phone:</strong>{" "}
                        <a 
                          href={`tel:${process.env.NEXT_PUBLIC_ORG_PHONE || "+919557513058"}`}
                          className="text-primary hover:underline"
                        >
                          {process.env.NEXT_PUBLIC_ORG_PHONE || "+91 95575 13058"}
                        </a>
                      </p>
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
