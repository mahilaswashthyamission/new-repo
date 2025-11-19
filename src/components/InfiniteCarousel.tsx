"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface CarouselImage {
  name: string;
  url: string;
}

export function InfiniteCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<CarouselImage | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        if (!supabase) {
          console.error('Supabase client not initialized');
          setLoading(false);
          return;
        }
        
        const { data: files, error } = await supabase
          .storage
          .from('msm_pictures')
          .list('', {
            limit: 100,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (error) {
          console.error('Error fetching images:', error);
          setLoading(false);
          return;
        }

        if (files && supabase) {
          const supabaseClient = supabase;
          const imageUrls = files
            .filter(file => {
              const ext = file.name.toLowerCase();
              return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || 
                     ext.endsWith('.png') || ext.endsWith('.webp');
            })
            .map(file => {
              const { data } = supabaseClient
                .storage
                .from('msm_pictures')
                .getPublicUrl(file.name);
              
              return {
                name: file.name,
                url: data.publicUrl
              };
            });

          setImages(imageUrls);
        }
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-muted/30 py-12">
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Loading gallery...</div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  // Triple the images for seamless loop
  const allImages = [...images, ...images, ...images];

  return (
    <div className="w-full bg-gradient-to-b from-background to-muted/30 py-12 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Our Impact in Pictures
        </h2>
        <p className="text-center text-muted-foreground">
          Moments from our programs and initiatives
        </p>
      </div>
      
      <div className="relative">
        {/* Fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-background via-background/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-background via-background/50 to-transparent z-10 pointer-events-none" />
        
        {/* Carousel track */}
        <div className="carousel-track">
          {allImages.map((image, index) => (
            <button
              key={`${image.name}-${index}`}
              onClick={() => setSelectedImage(image)}
              className="carousel-item group"
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image.url}
                  alt={image.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 280px, 320px"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none">
            <DialogTitle className="sr-only">{selectedImage.name}</DialogTitle>
            <div className="relative h-full flex items-center justify-center">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                <p className="text-white text-sm">{selectedImage.name}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
