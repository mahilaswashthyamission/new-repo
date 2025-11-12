import { HeroSlideshow } from "@/components/HeroSlideshow";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { Heart, Users, Target, TrendingUp } from "lucide-react";

async function getHomeData() {
  const heroSlides = await client.fetch(
    `*[_type == "heroSlide" && isActive == true] | order(order asc) {
      _id, title, subtitle, description, image, primaryCTA, secondaryCTA
    }`
  );

  const programs = await client.fetch(
    `*[_type == "program"] | order(_createdAt desc)[0...3] {
      _id, title, slug, status, summary, coverImage
    }`
  );

  const news = await client.fetch(
    `*[_type == "newsPost"] | order(date desc)[0...3] {
      _id, title, slug, date, excerpt, heroImage
    }`
  );

  return { heroSlides, programs, news };
}

const impactStats = [
  { icon: Users, label: "Women Empowered", value: "25,000+" },
  { icon: Target, label: "Health Camps Conducted", value: "150+" },
  { icon: Heart, label: "Active Volunteers", value: "800+" },
  { icon: TrendingUp, label: "Villages Reached", value: "200+" },
];

export default async function HomePage() {
  const { heroSlides, programs, news } = await getHomeData();

  return (
    <>
      <HeroSlideshow slides={heroSlides} />

      {/* Impact Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="mx-auto h-12 w-12 text-primary mb-4" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Work"
            title="Featured Programs"
            description="Explore our ongoing and completed programs making a real impact"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program: any) => (
              <Card key={program._id} className="overflow-hidden">
                {program.coverImage && (
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={urlFor(program.coverImage).width(600).height(400).url()}
                      alt={program.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant={program.status === "upcoming" ? "default" : "secondary"}>
                      {program.status}
                    </Badge>
                  </div>
                  <CardTitle>{program.title}</CardTitle>
                  <CardDescription>{program.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/programs/${program.slug.current}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link href="/programs">View All Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Updates"
            title="Latest News"
            description="Stay updated with our recent activities and announcements"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((post: any) => (
              <Card key={post._id} className="overflow-hidden">
                {post.heroImage && (
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={urlFor(post.heroImage).width(600).height(400).url()}
                      alt={post.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>{formatDate(post.date)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt || "Read more to discover the full story..."}
                  </p>
                  <Button asChild variant="link" className="px-0">
                    <Link href={`/news/${post.slug.current}`}>Read More →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/news">View All News</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Mahila Swashth Mission is committed to empowering women through comprehensive health education, 
              accessible healthcare services, and sustainable livelihood programs. We believe that healthy women 
              create healthy families and thriving communities.
            </p>
            <div className="grid gap-6 md:grid-cols-3 mt-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">🏥</div>
                  <h3 className="font-semibold mb-2">Health Services</h3>
                  <p className="text-sm text-muted-foreground">Free health camps, screenings, and awareness programs</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">📚</div>
                  <h3 className="font-semibold mb-2">Education</h3>
                  <p className="text-sm text-muted-foreground">Health literacy and skill development training</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">💼</div>
                  <h3 className="font-semibold mb-2">Livelihood</h3>
                  <p className="text-sm text-muted-foreground">Vocational training and entrepreneurship support</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us in Empowering Women</h2>
          <p className="text-lg mb-8 opacity-90">
            Your support helps us reach more women and create lasting impact in communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/donation">Support Our Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <Link href="/registration">Volunteer With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
