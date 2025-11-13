"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Programs",
    href: "/programs",
    children: [
      { name: "All Programs", href: "/programs" },
      { name: "Upcoming", href: "/programs?filter=upcoming" },
      { name: "Completed", href: "/programs?filter=completed" },
    ],
  },
  { name: "Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
  { name: "News", href: "/news" },
  {
    name: "More",
    children: [
      { name: "Documents", href: "/documents" },
      { name: "Jobs", href: "/jobs" },
      { name: "FAQs", href: "/faqs" },
      { name: "Why Us", href: "/why-us" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile menu button - Left side */}
        <button
          className="md:hidden p-2 -ml-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Logo - Center on mobile, left on desktop */}
        <Link href="/" className="flex items-center md:mr-auto">
          <Image
            src="/LOGO01.png"
            alt="Mahila Swashth Mission"
            width={200}
            height={56}
            className="h-14 w-auto"
            style={{ height: '3.5rem' }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name} className="group relative">
                <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 hidden w-48 rounded-md border bg-background py-2 shadow-lg group-hover:block">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm hover:bg-accent"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/registration">Register</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/donation">Donate</Link>
          </Button>
        </div>

        {/* Donate button for mobile */}
        <Button asChild size="sm" className="md:hidden">
          <Link href="/donation">Donate</Link>
        </Button>
      </nav>

      {/* Mobile Navigation - Enhanced Sidebar */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            style={{ touchAction: 'none' }}
          />
          
          {/* Sidebar - Left Side */}
          <div 
            className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-[320px] bg-background shadow-2xl z-50 md:hidden"
            style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
          >
            {/* Header - Fixed */}
            <div className="flex items-center justify-between p-4 border-b bg-background" style={{ flexShrink: 0 }}>
              <Image
                src="/LOGO01.png"
                alt="Mahila Swashth Mission"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-accent rounded-md transition-colors -mr-2"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Navigation */}
            <div 
              className="overflow-y-auto overflow-x-hidden"
              style={{ 
                flex: '1 1 0%',
                minHeight: 0,
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <nav className="p-3 pb-6">
                {navigation.map((item) =>
                  item.children ? (
                    <div key={item.name} className="mb-2">
                      <button
                        onClick={() => toggleSection(item.name)}
                        className="w-full flex items-center justify-between py-2.5 px-4 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                      >
                        <span>{item.name}</span>
                        {expandedSections.includes(item.name) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {expandedSections.includes(item.name) && (
                        <div className="space-y-1 mt-1 ml-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block py-2.5 px-4 text-sm text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-2.5 px-4 mb-1 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </nav>
            </div>

            {/* Footer CTAs - Fixed at bottom */}
            <div className="border-t p-3 bg-muted/30" style={{ flexShrink: 0 }}>
              <div className="space-y-2">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/registration" onClick={() => setMobileMenuOpen(false)}>
                    Register as Member
                  </Link>
                </Button>
                <Button asChild size="sm" className="w-full">
                  <Link href="/donation" onClick={() => setMobileMenuOpen(false)}>
                    Donate Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
