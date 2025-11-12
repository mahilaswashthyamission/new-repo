import { Hero } from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/lib/sanity";
import { Linkedin, Twitter } from "lucide-react";
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member: any) => (
              <Card key={member._id} className="overflow-hidden">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Photo</p>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-1">
                    {member.designation}
                  </p>
                  {member.sinceYear && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Since {member.sinceYear}
                    </p>
                  )}
                  {member.bio && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                  {member.socials && (
                    <div className="flex gap-3">
                      {member.socials.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                          aria-label="Twitter"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {members.length === 0 && (
            <p className="text-center text-muted-foreground">
              No team members found. Please add team members in Sanity Studio.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
