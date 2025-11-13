"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { submitContact } from "@/app/actions/contact";
import { useState } from "react";
import { MapPin, Phone, Mail, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const result = await submitContact(data);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      alert(result.error || "Failed to submit contact form");
    }
  };

  return (
    <>
      {/* Custom Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
                <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
                We&apos;re Here to Help
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Get in Touch With Us
              </h1>
              
              <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
                Have questions or need assistance? Our team is ready to help you. Reach out through any of our contact channels.
              </p>

              {/* Quick Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
                <div className="bg-white dark:bg-gray-950 rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Response Time</p>
                      <p className="font-semibold text-sm">Within 24 Hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-950 rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Support</p>
                      <p className="font-semibold text-sm">24/7 Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl"></div>
                <Image
                  src="/contact-hero.png"
                  alt="Contact Us - 24/7 Support"
                  width={500}
                  height={500}
                  className="relative z-10 w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
            {/* Contact Information - Hidden on Mobile */}
            <div className="hidden lg:block space-y-4 md:space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl">Contact Information</CardTitle>
                  <CardDescription>Reach out to us through any of these channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="bg-primary/10 rounded-lg p-2 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Address</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Shop no. 14 Mahajan complex, sector 4B, avas vikas, sikandra, agra - 282007
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="bg-primary/10 rounded-lg p-2 flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <a
                        href={`tel:${process.env.NEXT_PUBLIC_ORG_PHONE || "+919557513058"}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {process.env.NEXT_PUBLIC_ORG_PHONE || "+91 95575 13058"}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="bg-primary/10 rounded-lg p-2 flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a
                        href={`mailto:${process.env.NEXT_PUBLIC_ORG_EMAIL || "help@mahilaswashthyamission.in"}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                      >
                        {process.env.NEXT_PUBLIC_ORG_EMAIL || "help@mahilaswashthyamission.in"}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we&apos;ll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent>
                {isSuccess && (
                  <div className="mb-6 p-4 bg-primary/10 border-2 border-primary rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <p className="text-sm font-medium">Message sent successfully! We&apos;ll get back to you soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm md:text-base">Name *</Label>
                      <Input 
                        id="name" 
                        {...register("name")} 
                        placeholder="Your name" 
                        className="h-11 md:h-12 rounded-lg"
                      />
                      {errors.name && (
                        <p className="text-xs md:text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm md:text-base">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your.email@example.com"
                        className="h-11 md:h-12 rounded-lg"
                      />
                      {errors.email && (
                        <p className="text-xs md:text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm md:text-base">Phone *</Label>
                      <Input 
                        id="phone" 
                        {...register("phone")} 
                        placeholder="9876543210" 
                        className="h-11 md:h-12 rounded-lg"
                      />
                      {errors.phone && (
                        <p className="text-xs md:text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm md:text-base">Subject *</Label>
                      <Input 
                        id="subject" 
                        {...register("subject")} 
                        placeholder="What is this about?" 
                        className="h-11 md:h-12 rounded-lg"
                      />
                      {errors.subject && (
                        <p className="text-xs md:text-sm text-destructive">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm md:text-base">Message *</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className="rounded-lg resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs md:text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-11 md:h-12 text-base rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
