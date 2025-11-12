import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, TrendingUp, Heart, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Us",
  description: "Discover why we're a trusted partner in creating social impact.",
};

const trustMarkers = [
  {
    icon: Shield,
    title: "Transparency",
    description: "100% transparent operations with regular audits, financial reports, and impact assessments",
  },
  {
    icon: Award,
    title: "Certified & Registered",
    description: "Registered under Section 80G and 12A. All donations are tax-deductible",
  },
  {
    icon: Users,
    title: "Community-Centric",
    description: "Programs co-created with women and communities we serve, ensuring cultural sensitivity",
  },
  {
    icon: TrendingUp,
    title: "Proven Impact",
    description: "Over 25,000 women reached with measurable improvements in health outcomes",
  },
  {
    icon: Heart,
    title: "Experienced Team",
    description: "Healthcare professionals, social workers, and trained volunteers dedicated to women's health",
  },
  {
    icon: Target,
    title: "Holistic Approach",
    description: "Addressing physical, mental, and economic aspects of women's well-being",
  },
];

const stats = [
  { value: "25,000+", label: "Women Empowered" },
  { value: "150+", label: "Health Camps" },
  { value: "800+", label: "Active Volunteers" },
  { value: "200+", label: "Villages Reached" },
];

export default function WhyUsPage() {
  return (
    <>
      <Hero
        title="Why Support Mahila Swashth Mission"
        subtitle="Trust & Impact"
        description="Join thousands who trust us to create lasting change in women's health and empowerment"
      />

      {/* Impact Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Impact in Numbers"
            description="Real results from our commitment to social change"
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Markers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="What Sets Us Apart"
            description="Our commitment to excellence and transparency"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trustMarkers.map((marker) => (
              <Card key={marker.title}>
                <CardContent className="pt-6">
                  <marker.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{marker.title}</h3>
                  <p className="text-sm text-muted-foreground">{marker.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Affiliations & Certifications"
            description="Recognized and certified by leading organizations"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "80G Tax Exemption",
              "12A Registration",
              "NITI Aayog Registered",
              "CSR Eligible"
            ].map((cert) => (
              <Card key={cert}>
                <CardContent className="pt-6 text-center">
                  <p className="font-semibold">{cert}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
