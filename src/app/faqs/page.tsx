import { Hero } from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/JsonLd";
import { generateFAQSchema } from "@/lib/json-ld";
import { client } from "@/lib/sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about our organization, programs, and how to get involved.",
};

async function getFAQs() {
  return await client.fetch(
    `*[_type == "faq"] | order(order asc) {
      _id, question, answer
    }`
  );
}

export default async function FAQsPage() {
  const faqs = await getFAQs();

  return (
    <>
      <JsonLd data={generateFAQSchema(faqs)} />
      <Hero
        title="Frequently Asked Questions"
        subtitle="FAQs"
        description="Find answers to common questions about our organization and programs"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq: any) => (
              <Card key={faq._id}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}

            {faqs.length === 0 && (
              <p className="text-center text-muted-foreground">
                No FAQs available. Please check back later.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
