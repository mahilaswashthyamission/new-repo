import { Hero } from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { FileText, Download } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents",
  description: "Access our registration forms, policies, reports, and other important documents.",
};

async function getDocuments() {
  return await client.fetch(
    `*[_type == "downloadableDocument"] | order(publishedAt desc) {
      _id, title, category, file, publishedAt
    }`
  );
}

export default async function DocumentsPage() {
  const documents = await getDocuments();
  const categories = ["all", "registration", "policy", "report", "other"];

  return (
    <>
      <Hero
        title="Documents"
        subtitle="Resources"
        description="Download registration forms, policies, annual reports, and other important documents"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="capitalize">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-8">
                <div className="space-y-4">
                  {documents
                    .filter((doc: any) => category === "all" || doc.category === category)
                    .map((doc: any) => (
                      <Card key={doc._id}>
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="flex items-start gap-4 flex-1">
                            <FileText className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{doc.title}</h3>
                              <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                                <Badge variant="outline" className="capitalize">
                                  {doc.category}
                                </Badge>
                                {doc.publishedAt && (
                                  <span>{formatDate(doc.publishedAt)}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={doc.file?.asset?.url || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  {documents.filter((doc: any) => category === "all" || doc.category === category)
                    .length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No documents in this category.
                    </p>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
}
