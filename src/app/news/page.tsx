import { Hero } from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest News",
  description: "Stay updated with our recent activities, announcements, and success stories.",
};

async function getNews() {
  return await client.fetch(
    `*[_type == "newsPost"] | order(date desc) {
      _id, title, slug, date, author, excerpt, heroImage, tags
    }`
  );
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <>
      <Hero
        title="Latest News"
        subtitle="Updates & Stories"
        description="Stay informed about our activities, impact stories, and announcements"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((post: any) => (
              <Card key={post._id} className="flex flex-col">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Image</p>
                </div>
                <CardHeader>
                  <CardDescription>
                    {formatDate(post.date)}
                    {post.author && ` • ${post.author}`}
                  </CardDescription>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {post.excerpt || "Read more to discover the full story..."}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/news/${post.slug.current}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {news.length === 0 && (
            <p className="text-center text-muted-foreground">
              No news posts available. Check back soon for updates!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
