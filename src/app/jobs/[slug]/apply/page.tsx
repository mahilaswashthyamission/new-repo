"use client";

import { Hero } from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";

interface JobApplicationData {
  name: string;
  email: string;
  phone: string;
  coverMessage: string;
}

export default function JobApplyPage() {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobApplicationData>();

  const onSubmit = async (data: JobApplicationData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  if (isSuccess) {
    return (
      <>
        <Hero title="Application Submitted" />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="pt-12 pb-12">
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Thank You for Applying!</h2>
                <p className="text-muted-foreground mb-6">
                  We have received your job application. Our team will review it and contact you if your profile matches our requirements.
                </p>
                <Button onClick={() => setIsSuccess(false)}>Submit Another Application</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Hero
        title="Job Application"
        subtitle="Apply Now"
        description="Fill in your details to apply for this position"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
              <CardDescription>
                Please provide accurate information. We&apos;ll contact you if your profile matches.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    {...register("phone", { required: "Phone is required" })}
                    placeholder="9876543210"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume (PDF) *</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf"
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">Upload your resume in PDF format (max 5MB)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverMessage">Cover Message *</Label>
                  <Textarea
                    id="coverMessage"
                    {...register("coverMessage", { required: "Cover message is required" })}
                    placeholder="Tell us why you&apos;re a good fit for this role..."
                    rows={5}
                  />
                  {errors.coverMessage && (
                    <p className="text-sm text-destructive">{errors.coverMessage.message}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
