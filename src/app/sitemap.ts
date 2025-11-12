import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.SITE_URL || "https://ngo.org";

  // Fetch dynamic content
  const programs = await client.fetch(`*[_type == "program"]{ slug, _updatedAt }`);
  const news = await client.fetch(`*[_type == "newsPost"]{ slug, _updatedAt }`);
  const jobs = await client.fetch(`*[_type == "job" && isActive == true]{ slug, _updatedAt }`);

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/programs",
    "/team",
    "/gallery",
    "/news",
    "/jobs",
    "/documents",
    "/registration",
    "/contact",
    "/donation",
    "/faqs",
    "/why-us",
    "/applications",
    "/how-to-apply",
    "/privacy-policy",
    "/refund-policy",
    "/terms",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic pages
  const programPages = programs.map((program: any) => ({
    url: `${siteUrl}/programs/${program.slug.current}`,
    lastModified: new Date(program._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const newsPages = news.map((post: any) => ({
    url: `${siteUrl}/news/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const jobPages = jobs.map((job: any) => ({
    url: `${siteUrl}/jobs/${job.slug.current}`,
    lastModified: new Date(job._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...programPages, ...newsPages, ...jobPages];
}
