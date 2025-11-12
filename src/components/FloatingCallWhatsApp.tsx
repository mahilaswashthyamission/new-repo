"use client";

import { Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingCallWhatsApp() {
  const phone = process.env.NEXT_PUBLIC_ORG_PHONE || "+919876543210";
  const whatsapp = process.env.NEXT_PUBLIC_ORG_WHATSAPP || "919876543210";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:hidden">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        )}
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phone}`}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        )}
        aria-label="Call us"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
