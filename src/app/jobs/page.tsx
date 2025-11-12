import { Hero } from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { MapPin, Briefcase } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Openings",
  description: "Join our team and make a difference. Explore current job opportunities.",
};

async function getJobs() {
  return await client.fetch(
    `*[_type == "job" && isActive == true] | order(_createdAt desc) {
      _id, title, slug, location, type, description
    }`
  );
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <>
      <Hero
        title="Job Openings"
        subtitle="Join Our Team"
        description="Be part of our mission to create positive change. Explore current opportunities."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job: any) => (
              <Card key={job._id}>
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="outline" className="capitalize">
                      {job.type}
                    </Badge>
                  </div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="space-y-1">
                    {job.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={`/jobs/${job.slug.current}`}>View Details & Apply</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-2">
                No open positions at the moment
              </p>
              <p className="text-sm text-muted-foreground">
                Check back later or contact us to express your interest
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
