import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Team", href: "/team" },
    { name: "News", href: "/news" },
  ],
  "Get Involved": [
    { name: "Donate", href: "/donation" },
    { name: "Register", href: "/registration" },
    { name: "Jobs", href: "/jobs" },
    { name: "Contact", href: "/contact" },
  ],
  "Resources": [
    { name: "Documents", href: "/documents" },
    { name: "Gallery", href: "/gallery" },
    { name: "FAQs", href: "/faqs" },
    { name: "Why Us", href: "/why-us" },
  ],
  "Legal": [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-bold">Mahila Swashth Mission</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Main Street, City, State - 123456, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={`tel:${process.env.NEXT_PUBLIC_ORG_PHONE || "+919876543210"}`} className="hover:text-primary">
                  {process.env.NEXT_PUBLIC_ORG_PHONE || "+91 98765 43210"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href={`mailto:${process.env.NEXT_PUBLIC_ORG_EMAIL || "info@ngo.org"}`} className="hover:text-primary">
                  {process.env.NEXT_PUBLIC_ORG_EMAIL || "info@ngo.org"}
                </a>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold">{title}</h4>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mahila Swashth Mission. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
