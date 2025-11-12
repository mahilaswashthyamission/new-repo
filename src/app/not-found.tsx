import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Hero title="404 - Page Not Found" />
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild size="lg">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
