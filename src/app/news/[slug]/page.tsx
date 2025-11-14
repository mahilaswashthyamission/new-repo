import { Hero } from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/JsonLd";
import { generateArticleSchema } from "@/lib/json-ld";
import { client, urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponents";

async function getNewsPost(slug: string) {
  return await client.fetch(
    `*[_type == "newsPost" && slug.current == $slug][0] {
      _id, title, slug, date, author, heroImage, body, tags, excerpt
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.SITE_URL || "https://ngo.org";
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt || "",
    author: post.author || "NGO Organization",
    datePublished: post.date,
    url: `${siteUrl}/news/${post.slug.current}`,
  });

  return (
    <>
      <JsonLd data={articleSchema} />
      <Hero title={post.title} />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {post.heroImage && (
              <div className="aspect-video bg-muted relative overflow-hidden rounded-lg mb-8">
                <Image
                  src={urlFor(post.heroImage).width(1200).height(675).url()}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            )}

            <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {post.body && (
              <div className="prose prose-lg max-w-none">
                <PortableText value={post.body} components={portableTextComponents} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
