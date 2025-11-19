import { Hero } from "@/components/Hero";
import { SupabaseGallery } from "@/components/SupabaseGallery";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { client, urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse through our collection of photos and videos from our programs and events.",
};

async function getAlbums() {
  return await client.fetch(
    `*[_type == "album"] | order(date desc) {
      _id, title, slug, date, media
    }`
  );
}

export default async function GalleryPage() {
  const albums = await getAlbums();

  return (
    <>
      <Hero
        title="Gallery"
        subtitle="Our Moments"
        description="Explore photos and videos from our programs, events, and community activities"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Supabase Gallery */}
          <SupabaseGallery />

          {/* Albums from Sanity */}
          {albums.length > 0 && (
            <h2 className="text-2xl font-bold mb-6">Photo Albums</h2>
          )}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {albums.map((album: any) => {
              const firstImage = album.media?.find((item: any) => item.type === 'image' && item.image);
              const imageCount = album.media?.filter((item: any) => item.type === 'image').length || 0;
              const videoCount = album.media?.filter((item: any) => item.type === 'video').length || 0;
              
              return (
                <Link key={album._id} href={`/gallery/${album.slug.current}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      {firstImage ? (
                        <Image
                          src={urlFor(firstImage.image).width(600).height(400).url()}
                          alt={album.title}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-muted-foreground">No images</p>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle>{album.title}</CardTitle>
                      {album.date && (
                        <CardDescription>{formatDate(album.date)}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {imageCount > 0 && `${imageCount} photo${imageCount !== 1 ? 's' : ''}`}
                        {imageCount > 0 && videoCount > 0 && ' • '}
                        {videoCount > 0 && `${videoCount} video${videoCount !== 1 ? 's' : ''}`}
                        {imageCount === 0 && videoCount === 0 && 'No media'}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {albums.length === 0 && (
            <p className="text-center text-muted-foreground">
              No albums available yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
