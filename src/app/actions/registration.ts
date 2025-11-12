"use server";

import { writeClient } from "@/lib/sanity";
import { sendEmail } from "@/lib/email";
import { registrationSchema, type RegistrationFormData } from "@/lib/validations";

export async function submitRegistration(data: RegistrationFormData) {
  try {
    const validated = registrationSchema.parse(data);

    // Create application in Sanity
    const application = await writeClient.create({
      _type: "application",
      name: validated.fullName,
      email: validated.email,
      phone: validated.phone,
      city: validated.city,
      message: validated.message,
      type: "membership",
      submittedAt: new Date().toISOString(),
    });

    // Send email to organization
    await sendEmail({
      to: process.env.ORG_EMAIL || "info@ngo.org",
      subject: "New Membership Registration",
      html: `
        <h2>New Membership Registration</h2>
        <p><strong>Name:</strong> ${validated.fullName}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Phone:</strong> ${validated.phone}</p>
        <p><strong>City:</strong> ${validated.city}</p>
        <p><strong>Message:</strong> ${validated.message}</p>
      `,
    });

    // Send confirmation email to user
    await sendEmail({
      to: validated.email,
      subject: "Registration Received - Mahila Swashth Mission",
      html: `
        <h2>Thank you for registering!</h2>
        <p>Dear ${validated.fullName},</p>
        <p>We have received your membership registration. Our team will review your application and get back to you soon.</p>
        <p>Best regards,<br>Mahila Swashth Mission</p>
      `,
    });

    return { success: true, data: application };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Failed to submit registration" };
  }
}
