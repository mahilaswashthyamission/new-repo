import { Hero } from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Users, Briefcase, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications",
  description: "Information about membership and job applications.",
};

export default function ApplicationsPage() {
  return (
    <>
      <Hero
        title="Applications"
        subtitle="Join Us"
        description="Learn about different ways to get involved with our organization"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Membership */}
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Membership Application</CardTitle>
                <CardDescription>
                  Become a member and actively participate in our programs and initiatives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What is Membership?</h4>
                  <p className="text-sm text-muted-foreground">
                    Members are individuals who support our mission and participate in our activities, programs, and decision-making processes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Benefits</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Participate in programs and events</li>
                    <li>Voting rights in organizational decisions</li>
                    <li>Networking opportunities</li>
                    <li>Regular updates and newsletters</li>
                  </ul>
                </div>
                <Button asChild className="w-full">
                  <Link href="/registration">Apply for Membership</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Job Applications */}
            <Card>
              <CardHeader>
                <Briefcase className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Job Applications</CardTitle>
                <CardDescription>
                  Join our team and make a career out of creating social impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Why Work With Us?</h4>
                  <p className="text-sm text-muted-foreground">
                    Work in a mission-driven environment where your skills contribute to meaningful social change.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What We Offer</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Competitive compensation</li>
                    <li>Professional development</li>
                    <li>Flexible work arrangements</li>
                    <li>Meaningful work experience</li>
                  </ul>
                </div>
                <Button asChild className="w-full">
                  <Link href="/jobs">View Open Positions</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* How to Apply */}
          <div className="max-w-4xl mx-auto mt-12">
            <Card>
              <CardHeader>
                <HelpCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle>How to Apply</CardTitle>
                <CardDescription>
                  Follow these simple steps to complete your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal list-inside">
                  <li className="text-sm">Choose the type of application (Membership or Job)</li>
                  <li className="text-sm">Fill out the online form with accurate information</li>
                  <li className="text-sm">Upload required documents (if applicable)</li>
                  <li className="text-sm">Review and submit your application</li>
                  <li className="text-sm">Wait for confirmation email</li>
                  <li className="text-sm">Our team will review and contact you</li>
                </ol>
                <div className="mt-6">
                  <Button asChild variant="outline">
                    <Link href="/how-to-apply">Detailed Application Guide</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
