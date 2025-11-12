import { Hero } from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, UserPlus, Briefcase } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Apply",
  description: "Learn how to fill out application forms for membership and job opportunities.",
};

export default function HowToApplyPage() {
  return (
    <>
      <Hero
        title="How to Apply"
        subtitle="Application Guide"
        description="Step-by-step instructions for filling out our application forms"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Video Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Video Tutorial: How to Fill Application Forms
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Types */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <UserPlus className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Membership Registration</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Join our organization as a member and participate in our programs
                </p>
                <Button asChild className="w-full">
                  <Link href="/registration">Apply for Membership</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Job Applications</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Apply for open positions and join our team
                </p>
                <Button asChild className="w-full">
                  <Link href="/jobs">View Job Openings</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Documents</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Download forms and required documents
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/documents">View Documents</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-6">General Instructions</h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="space-y-4 list-decimal list-inside">
                  <li className="text-sm">
                    <strong>Fill all required fields:</strong> Fields marked with * are mandatory
                  </li>
                  <li className="text-sm">
                    <strong>Provide accurate information:</strong> Ensure all details are correct and up-to-date
                  </li>
                  <li className="text-sm">
                    <strong>Valid contact details:</strong> Use a working email and phone number
                  </li>
                  <li className="text-sm">
                    <strong>Document uploads:</strong> Ensure files are in PDF format and under 5MB
                  </li>
                  <li className="text-sm">
                    <strong>Review before submission:</strong> Double-check all information before submitting
                  </li>
                  <li className="text-sm">
                    <strong>Confirmation:</strong> You'll receive a confirmation email after successful submission
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
