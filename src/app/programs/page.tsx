import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore our ongoing and completed programs making a real impact in communities.",
};

async function getPrograms() {
  return await client.fetch(
    `*[_type == "program"] | order(startDate desc) {
      _id, title, slug, status, summary, coverImage, startDate, endDate, location
    }`
  );
}

export default async function ProgramsPage() {
  const programs = await getPrograms();
  const upcoming = programs.filter((p: any) => p.status === "upcoming");
  const completed = programs.filter((p: any) => p.status === "completed");

  return (
    <>
      <Hero
        title="Our Programs"
        subtitle="Making Impact"
        description="Discover the initiatives we're running to create positive change in communities"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {programs.map((program: any) => (
                  <ProgramCard key={program._id} program={program} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcoming.length > 0 ? (
                  upcoming.map((program: any) => (
                    <ProgramCard key={program._id} program={program} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground">
                    No upcoming programs at the moment.
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {completed.length > 0 ? (
                  completed.map((program: any) => (
                    <ProgramCard key={program._id} program={program} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground">
                    No completed programs yet.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}

function ProgramCard({ program }: { program: any }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="mb-2">
          <Badge variant={program.status === "upcoming" ? "default" : "secondary"}>
            {program.status}
          </Badge>
        </div>
        <CardTitle>{program.title}</CardTitle>
        <CardDescription>
          {program.location && <span>{program.location}</span>}
          {program.startDate && (
            <span className="block text-xs mt-1">
              {formatDate(program.startDate)}
              {program.endDate && ` - ${formatDate(program.endDate)}`}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {program.summary}
        </p>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/programs/${program.slug.current}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
