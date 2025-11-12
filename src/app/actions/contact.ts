"use server";

import { writeClient } from "@/lib/sanity";
import { sendEmail } from "@/lib/email";
import { contactSchema, type ContactFormData } from "@/lib/validations";

export async function submitContact(data: ContactFormData) {
  try {
    const validated = contactSchema.parse(data);

    // Create contact message in Sanity
    const message = await writeClient.create({
      _type: "contactMessage",
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      subject: validated.subject,
      message: validated.message,
      submittedAt: new Date().toISOString(),
    });

    // Send email to organization
    await sendEmail({
      to: process.env.ORG_EMAIL || "info@ngo.org",
      subject: `Contact Form: ${validated.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validated.name}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Phone:</strong> ${validated.phone}</p>
        <p><strong>Subject:</strong> ${validated.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validated.message}</p>
      `,
    });

    return { success: true, data: message };
  } catch (error) {
    console.error("Contact error:", error);
    return { success: false, error: "Failed to submit contact form" };
  }
}
