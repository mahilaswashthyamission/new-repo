"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { submitJobApplication } from "@/app/actions/job-application";

interface JobApplicationFormProps {
  jobSlug: string;
  jobTitle: string;
}

export function JobApplicationForm({ jobSlug, jobTitle }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("jobSlug", jobSlug);
    formData.append("jobTitle", jobTitle);

    const result = await submitJobApplication(formData);

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      setError(result.error || "Failed to submit application");
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-none shadow-none">
        <CardContent className="pt-6 text-center">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Thank You for Applying!</h2>
          <p className="text-muted-foreground">
            We have received your job application. Our team will review it and contact you if your profile matches our requirements.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-md">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="Your full name"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your.email@example.com"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          name="phone"
          required
          placeholder="9876543210"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resume">Resume (PDF) *</Label>
        <Input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf"
          required
          className="cursor-pointer"
          disabled={isSubmitting}
        />
        <p className="text-xs text-muted-foreground">Upload your resume in PDF format (max 5MB)</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverMessage">Cover Message *</Label>
        <Textarea
          id="coverMessage"
          name="coverMessage"
          required
          placeholder="Tell us why you're a good fit for this role..."
          rows={5}
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
