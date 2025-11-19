"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  name: string;
  url: string;
}

export function SupabaseGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
                name: file.name.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
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

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Loading images...</div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  const carouselImages = images.slice(0, 10);
  const masonryImages = images.slice(10, 20);
  const gridImages = images.slice(20);

  return (
    <div className="mb-16 space-y-12">
      {/* Section 1: Infinite Carousel (First 10 images) */}
      {carouselImages.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Featured Photos</h2>
          <div className="relative overflow-hidden -mx-4 px-4">
            {/* Fade gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background via-background/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background via-background/50 to-transparent z-10 pointer-events-none" />
            
            {/* Infinite scrolling track */}
            <div className="gallery-carousel-track">
              {/* Triple the images for seamless loop */}
              {[...carouselImages, ...carouselImages, ...carouselImages].map((image, idx) => {
                const originalIdx = idx % carouselImages.length;
                return (
                  <button
                    key={idx}
                    onClick={() => openLightbox(originalIdx)}
                    className="gallery-carousel-item group"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={image.url}
                        alt={image.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="320px"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Masonry/Mixed Layout (Next 10 images) */}
      {masonryImages.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Highlights</h2>
          {/* Mobile: Simple 2-column grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {masonryImages.map((image, idx) => {
              const actualIdx = idx + 10;
              const isWide = idx % 3 === 0;
              
              return (
                <button
                  key={actualIdx}
                  onClick={() => openLightbox(actualIdx)}
                  className={`group relative overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md active:scale-95 transition-all
                    ${isWide ? 'col-span-2 aspect-video' : 'aspect-square'}
                  `}
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) ${isWide ? '100vw' : '50vw'}"
                  />
                </button>
              );
            })}
          </div>
          
          {/* Desktop: Complex masonry */}
          <div className="hidden md:grid md:grid-cols-4 gap-4">
            {masonryImages.map((image, idx) => {
              const actualIdx = idx + 10;
              const isLarge = idx % 5 === 0;
              const isTall = idx % 7 === 0;
              
              return (
                <button
                  key={actualIdx}
                  onClick={() => openLightbox(actualIdx)}
                  className={`group relative overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md hover:shadow-xl transition-all
                    ${isLarge ? 'col-span-2 row-span-2' : ''}
                    ${isTall && !isLarge ? 'row-span-2' : ''}
                    ${!isLarge && !isTall ? 'aspect-square' : ''}
                  `}
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="25vw"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 3: Standard Grid (Remaining images) */}
      {gridImages.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">More Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {gridImages.map((image, idx) => {
              const actualIdx = idx + 20;
              return (
                <button
                  key={actualIdx}
                  onClick={() => openLightbox(actualIdx)}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm hover:shadow-lg transition-all"
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none">
          <DialogTitle className="sr-only">
            {selectedIndex !== null ? images[selectedIndex].name : 'Image'}
          </DialogTitle>
          {selectedIndex !== null && (
            <div className="relative h-full flex items-center justify-center">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* Previous button */}
              {images.length > 1 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
              )}

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center p-12">
                <Image
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].name}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Next button */}
              {images.length > 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              )}

              {/* Counter */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                <p className="text-white text-sm">
                  {selectedIndex + 1} / {images.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
