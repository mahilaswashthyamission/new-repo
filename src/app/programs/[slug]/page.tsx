import { Hero } from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { Lightbox } from "@/components/Lightbox";
import { client, urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponents";

async function getProgram(slug: string) {
  return await client.fetch(
    `*[_type == "program" && slug.current == $slug][0] {
      _id, title, slug, status, summary, coverImage, gallery, startDate, endDate, location, body
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return {};

  return {
    title: program.title,
    description: program.summary,
  };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    notFound();
  }

  return (
    <>
      <Hero title={program.title} subtitle={program.summary} />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {program.coverImage && (
              <div className="aspect-video bg-muted relative overflow-hidden rounded-lg mb-8">
                <Image
                  src={urlFor(program.coverImage).width(1200).height(675).url()}
                  alt={program.title}
                  width={1200}
                  height={675}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            )}

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
                <PortableText value={program.body} components={portableTextComponents} />
              </div>
            )}

            {program.gallery && program.gallery.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Gallery ({program.gallery.length})</h2>
                <Lightbox images={program.gallery.map((image: any, idx: number) => ({
                  image,
                  caption: `${program.title} - Image ${idx + 1}`
                }))} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
