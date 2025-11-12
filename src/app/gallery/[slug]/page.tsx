import { Hero } from "@/components/Hero";
import { client, urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Lightbox } from "@/components/Lightbox";

async function getAlbum(slug: string) {
  return await client.fetch(
    `*[_type == "album" && slug.current == $slug][0] {
      _id, title, slug, date, media
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const album = await getAlbum(params.slug);
  if (!album) return {};

  return {
    title: album.title,
    description: `Photo gallery: ${album.title}`,
  };
}

export default async function AlbumDetailPage({ params }: { params: { slug: string } }) {
  const album = await getAlbum(params.slug);

  if (!album) {
    notFound();
  }

  const images = album.media?.filter((item: any) => item.type === 'image' && item.image) || [];
  const videos = album.media?.filter((item: any) => item.type === 'video' && item.videoUrl) || [];

  return (
    <>
      <Hero 
        title={album.title} 
        subtitle={album.date ? formatDate(album.date) : undefined}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Images */}
          {images.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Photos ({images.length})</h2>
              <Lightbox images={images} />
            </div>
          )}

          {/* Videos */}
          {videos.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Videos ({videos.length})</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video: any, idx: number) => (
                  <div key={idx} className="space-y-2">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      {video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be') ? (
                        <iframe
                          src={video.videoUrl.replace('watch?v=', 'embed/')}
                          className="w-full h-full"
                          allowFullScreen
                          title={video.caption || `Video ${idx + 1}`}
                        />
                      ) : (
                        <video
                          src={video.videoUrl}
                          controls
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {video.caption && (
                      <p className="text-sm text-muted-foreground">{video.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {images.length === 0 && videos.length === 0 && (
            <p className="text-center text-muted-foreground">
              No media in this album yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
