import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  backgroundImage?: string;
}

export function Hero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
}: HeroProps) {
  return (
    <section
      className="relative flex min-h-[500px] items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-20"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="container mx-auto text-center">
        {subtitle && (
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
            {subtitle}
          </p>
        )}
        <h1 className={`mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl ${backgroundImage ? "text-white" : ""}`}>
          {title}
        </h1>
        {description && (
          <p className={`mx-auto mb-8 max-w-2xl text-lg ${backgroundImage ? "text-gray-200" : "text-muted-foreground"}`}>
            {description}
          </p>
        )}
        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {primaryCTA && (
              <Button asChild size="lg">
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
            )}
            {secondaryCTA && (
              <Button asChild variant="outline" size="lg">
                <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
