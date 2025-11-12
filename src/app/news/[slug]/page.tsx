import { Hero } from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/JsonLd";
import { generateArticleSchema } from "@/lib/json-ld";
import { client } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";

async function getNewsPost(slug: string) {
  return await client.fetch(
    `*[_type == "newsPost" && slug.current == $slug][0] {
      _id, title, slug, date, author, heroImage, body, tags, excerpt
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getNewsPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const post = await getNewsPost(params.slug);

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
                <PortableText value={post.body} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
