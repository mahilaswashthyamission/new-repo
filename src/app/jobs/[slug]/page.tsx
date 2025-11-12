import { Hero } from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/lib/sanity";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponents";

async function getJob(slug: string) {
  return await client.fetch(
    `*[_type == "job" && slug.current == $slug][0] {
      _id, title, slug, location, type, description, applyEmail, isActive
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return {};

  return {
    title: job.title,
    description: `${job.type} position at ${job.location || "our organization"}`,
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job || !job.isActive) {
    notFound();
  }

  return (
    <>
      <Hero title={job.title} />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  <Badge variant="outline" className="capitalize">
                    {job.type}
                  </Badge>
                  {job.location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  )}
                </div>

                {job.description && (
                  <div className="prose prose-lg max-w-none mb-8">
                    <PortableText value={job.description} components={portableTextComponents} />
                  </div>
                )}

                <div className="flex gap-4">
                  <Button asChild size="lg">
                    <Link href={`/jobs/${job.slug.current}/apply`}>Apply Now</Link>
                  </Button>
                  {job.applyEmail && (
                    <Button asChild variant="outline" size="lg">
                      <a href={`mailto:${job.applyEmail}`}>Email Application</a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
