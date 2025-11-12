"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";

interface HeroSlide {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: any;
  primaryCTA?: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
}

interface HeroSlideshowProps {
  slides: HeroSlide[];
}

export function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  if (!slides || slides.length === 0) {
    return (
      <section className="relative flex min-h-[500px] items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-20">
        <div className="container mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Empowering Women Through Health & Wellness
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Add hero slides in Sanity Studio to showcase your mission
          </p>
        </div>
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((s, index) => (
        <div
          key={s._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: s.image
                ? `url(${urlFor(s.image).width(1920).height(1080).url()})`
                : "linear-gradient(to bottom right, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.05))",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                {s.subtitle && (
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {s.subtitle}
                  </p>
                )}
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                  {s.title}
                </h1>
                {s.description && (
                  <p className="mb-8 text-lg text-white/90 md:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    {s.description}
                  </p>
                )}
                {(s.primaryCTA || s.secondaryCTA) && (
                  <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    {s.primaryCTA && (
                      <Button asChild size="lg" className="shadow-lg">
                        <Link href={s.primaryCTA.link}>{s.primaryCTA.text}</Link>
                      </Button>
                    )}
                    {s.secondaryCTA && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="bg-white/10 text-white border-white hover:bg-white/20 backdrop-blur-sm shadow-lg"
                      >
                        <Link href={s.secondaryCTA.link}>{s.secondaryCTA.text}</Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
