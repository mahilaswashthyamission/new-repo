export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Mahila Swashth Mission",
    url: process.env.SITE_URL || "https://ngo.org",
    logo: `${process.env.SITE_URL || "https://ngo.org"}/logo.png`,
    description: "Making a positive impact on society through our programs and initiatives",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main Street",
      addressLocality: "City",
      addressRegion: "State",
      postalCode: "123456",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: process.env.ORG_PHONE || "+919876543210",
      contactType: "customer service",
      email: process.env.ORG_EMAIL || "info@ngo.org",
    },
    sameAs: [
      "https://facebook.com/ngo",
      "https://twitter.com/ngo",
      "https://instagram.com/ngo",
      "https://linkedin.com/company/ngo",
      "https://youtube.com/@ngo",
    ],
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Mahila Swashth Mission",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.SITE_URL || "https://ngo.org"}/logo.png`,
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image,
    url: article.url,
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      "@type": "Place",
      name: event.location,
    },
    organizer: {
      "@type": "Organization",
      name: "Mahila Swashth Mission",
      url: process.env.SITE_URL || "https://ngo.org",
    },
    url: event.url,
  };
}
