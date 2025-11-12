import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function GET() {
  const news = await client.fetch(
    `*[_type == "newsPost"] | order(date desc)[0...20] {
      title, slug, date, excerpt
    }`
  );

  const siteUrl = process.env.SITE_URL || "https://ngo.org";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mahila Swashth Mission - Latest News</title>
    <link>${siteUrl}</link>
    <description>Latest news and updates from Mahila Swashth Mission</description>
    <language>en</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${news
      .map(
        (post: any) => `
    <item>
      <title>${post.title}</title>
      <link>${siteUrl}/news/${post.slug.current}</link>
      <description>${post.excerpt || ""}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/news/${post.slug.current}</guid>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
