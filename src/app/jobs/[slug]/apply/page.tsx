import { Hero } from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { JobApplicationForm } from "./JobApplicationForm";

async function getJob(slug: string) {
  return await client.fetch(
    `*[_type == "job" && slug.current == $slug][0] {
      _id, title, slug, isActive
    }`,
    { slug }
  );
}

export default async function JobApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job || !job.isActive) {
    notFound();
  }

  return (
    <>
      <Hero
        title="Job Application"
        subtitle={job.title}
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
              <JobApplicationForm jobSlug={job.slug.current} jobTitle={job.title} />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
