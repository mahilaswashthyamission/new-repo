import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our mission, vision, and the impact we're making in communities.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Mahila Swashth Mission"
        subtitle="Our Story"
        description="Empowering women through health, education, and sustainable livelihoods since 2015"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <SectionHeading
                eyebrow="Who We Are"
                title="Transforming Lives Through Women's Health"
                description="Mahila Swashth Mission is dedicated to improving the health and well-being of women in underserved communities across India."
                align="left"
              />
              <p className="text-muted-foreground mb-4">
                Founded in 2015, Mahila Swashth Mission emerged from the recognition that women's health is fundamental 
                to family and community well-being. We work in rural and semi-urban areas where access to quality 
                healthcare and health education is limited.
              </p>
              <p className="text-muted-foreground mb-4">
                Our holistic approach addresses not just physical health, but also mental well-being, nutrition, 
                reproductive health, and economic empowerment. We believe that when women are healthy and empowered, 
                entire communities thrive.
              </p>
              <p className="text-muted-foreground">
                Through partnerships with local communities, healthcare providers, and government agencies, we've 
                reached over 25,000 women across 200+ villages, conducting health camps, awareness programs, and 
                skill development workshops.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-8 h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground text-center">Women's Health Program Image</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Purpose"
            title="Mission & Vision"
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To improve the health and well-being of women in underserved communities through accessible healthcare, 
                  education, and economic empowerment programs that create lasting positive change.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Eye className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  A society where every woman has access to quality healthcare, health education, and opportunities 
                  to lead a healthy, dignified, and economically independent life.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Values</h3>
                <p className="text-muted-foreground">
                  Compassion, dignity, empowerment, and community participation guide our work. We believe in 
                  culturally sensitive, evidence-based approaches that respect women's choices and agency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Focus Areas"
            description="Comprehensive programs addressing women's health and empowerment"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Maternal & Child Health",
              "Reproductive Health",
              "Nutrition & Wellness",
              "Skill Development"
            ].map((area) => (
              <Card key={area}>
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold text-lg">{area}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
