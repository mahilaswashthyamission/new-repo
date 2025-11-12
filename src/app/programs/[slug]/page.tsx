import { Hero } from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { client } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";

async function getProgram(slug: string) {
  return await client.fetch(
    `*[_type == "program" && slug.current == $slug][0] {
      _id, title, slug, status, summary, coverImage, gallery, startDate, endDate, location, body
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const program = await getProgram(params.slug);
  if (!program) return {};

  return {
    title: program.title,
    description: program.summary,
  };
}

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = await getProgram(params.slug);

  if (!program) {
    notFound();
  }

  return (
    <>
      <Hero title={program.title} subtitle={program.summary} />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant={program.status === "upcoming" ? "default" : "secondary"} className="text-sm">
                {program.status}
              </Badge>
              {program.startDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(program.startDate)}
                    {program.endDate && ` - ${formatDate(program.endDate)}`}
                  </span>
                </div>
              )}
              {program.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{program.location}</span>
                </div>
              )}
            </div>

            {program.body && (
              <div className="prose prose-lg max-w-none mb-12">
                <PortableText value={program.body} />
              </div>
            )}

            {program.gallery && program.gallery.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {program.gallery.map((image: any, idx: number) => (
                    <div key={idx} className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        Image {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
