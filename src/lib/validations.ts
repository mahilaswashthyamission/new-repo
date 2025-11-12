import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  city: z.string().min(2, "City is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const donationSchema = z.object({
  donorName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  amount: z.number().min(100, "Minimum donation is ₹100"),
  pan: z.string().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type DonationFormData = z.infer<typeof donationSchema>;
