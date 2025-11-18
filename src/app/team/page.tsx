import { Hero } from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { client, urlFor } from "@/lib/sanity";
import { Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the dedicated individuals driving our mission forward.",
};

async function getTeamMembers() {
  return await client.fetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, designation, sinceYear, photo, bio, socials
    }`
  );
}

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <>
      <Hero
        title="Our Team"
        subtitle="Meet the People"
        description="Dedicated individuals working together to create positive change"
      />

      {/* Mission Description Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
              About Mahila Swashthya Mission
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-4">
                Mahila Swashthya Mission is dedicated to empowering women and improving healthcare access 
                in underserved communities. Our organization focuses on women&apos;s health, education, and 
                socio-economic development through comprehensive programs and initiatives.
              </p>
              <p className="mb-4">
                Founded with the vision of creating a healthier and more equitable society, we work 
                tirelessly to bridge the gap in healthcare services, particularly for women and children. 
                Our multidisciplinary approach combines medical expertise, community outreach, and 
                sustainable development practices.
              </p>
              <p>
                Our team comprises passionate healthcare professionals, social workers, educators, and 
                volunteers who share a common commitment to making healthcare accessible and affordable 
                for all. Together, we strive to create lasting impact in the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{members.length}+</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Commitment</div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Meet Our Dedicated Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our diverse team brings together expertise from healthcare, social work, education, and community development 
              to create meaningful change in women&apos;s health and empowerment.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {members.map((member: any) => (
              <Card key={member._id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                <div className="relative">
                  {member.photo ? (
                    <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                      <Image
                        src={urlFor(member.photo).width(300).height(375).url()}
                        alt={member.name}
                        width={300}
                        height={375}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Social links overlay */}
                  {member.socials && (member.socials.linkedin || member.socials.twitter) && (
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {member.socials.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4 text-blue-600" />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
                          aria-label="Twitter"
                        >
                          <Twitter className="h-4 w-4 text-blue-400" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-base mb-1 line-clamp-1" title={member.name}>
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-1 line-clamp-1" title={member.designation}>
                    {member.designation}
                  </p>
                  {member.sinceYear && (
                    <p className="text-xs text-muted-foreground mb-2">
                      Since {member.sinceYear}
                    </p>
                  )}
                  {member.bio && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed" title={member.bio}>
                      {member.bio}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {members.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-muted-foreground">
                No team members found. Please add team members in Sanity Studio.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
