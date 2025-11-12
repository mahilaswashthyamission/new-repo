"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { urlFor } from "@/lib/sanity";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxProps {
  images: any[];
}

export function Lightbox({ images }: LightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <>
      {/* Grid of thumbnails */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((item: any, idx: number) => (
          <button
            key={idx}
            onClick={() => openLightbox(idx)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <img
              src={urlFor(item.image).width(400).height(400).url()}
              alt={item.caption || `Image ${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-sm text-white line-clamp-2">{item.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent 
          className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none"
          onKeyDown={handleKeyDown}
        >
          <DialogTitle className="sr-only">
            {selectedIndex !== null && images[selectedIndex]?.caption 
              ? images[selectedIndex].caption 
              : `Image ${(selectedIndex || 0) + 1} of ${images.length}`}
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
                <img
                  src={urlFor(images[selectedIndex].image).width(1920).height(1080).url()}
                  alt={images[selectedIndex].caption || `Image ${selectedIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
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

              {/* Caption and counter */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                <p className="text-white text-sm mb-2">
                  {selectedIndex + 1} / {images.length}
                </p>
                {images[selectedIndex].caption && (
                  <p className="text-white text-lg">{images[selectedIndex].caption}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
