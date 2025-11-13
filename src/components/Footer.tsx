import Link from "next/link";
import Image from "next/image";
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
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-16">
          {/* Organization Info - Takes more space on desktop */}
          <div>
            <div className="mb-4">
              <Image 
                src="/LOGO01.png" 
                alt="Mahila Swashth Mission" 
                width={180} 
                height={60}
                className="h-14 w-auto"
              />
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Shop no. 14 Mahajan complex, sector 4B, avas vikas, sikandra, agra - 282007</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={`tel:${process.env.NEXT_PUBLIC_ORG_PHONE || "+919557513058"}`} className="hover:text-primary">
                  {process.env.NEXT_PUBLIC_ORG_PHONE || "+91 95575 13058"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href={`mailto:${process.env.NEXT_PUBLIC_ORG_EMAIL || "help@mahilaswashthyamission.in"}`} className="hover:text-primary break-all">
                  {process.env.NEXT_PUBLIC_ORG_EMAIL || "help@mahilaswashthyamission.in"}
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

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks["Quick Links"].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks["Get Involved"].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.Resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - Now in the same row on desktop */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.Legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mahila Swashth Mission. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
