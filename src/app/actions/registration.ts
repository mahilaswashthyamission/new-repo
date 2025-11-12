"use server";

import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";
import { registrationSchema, type RegistrationFormData } from "@/lib/validations";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function submitRegistration(data: RegistrationFormData) {
  try {
    const validated = registrationSchema.parse(data);

    // Create user account in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: validated.email,
      password: Math.random().toString(36).slice(-12), // Generate random password
      email_confirm: true,
      user_metadata: {
        full_name: validated.fullName,
        phone: validated.phone,
        city: validated.city,
      },
    });

    if (authError) {
      console.error("Auth error:", authError);
      return { success: false, error: "Failed to create account" };
    }

    // Store member data in Supabase database
    const { error: dbError } = await supabase.from("members").insert({
      id: authData.user.id,
      email: validated.email,
      full_name: validated.fullName,
      phone: validated.phone,
      city: validated.city,
      message: validated.message,
      status: "pending",
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return { success: false, error: "Failed to save member data" };
    }

    // Send password reset email so user can set their password
    await supabase.auth.resetPasswordForEmail(validated.email, {
      redirectTo: `${process.env.SITE_URL}/auth/reset-password`,
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
      subject: "Registration Received - Set Your Password",
      html: `
        <h2>Thank you for registering!</h2>
        <p>Dear ${validated.fullName},</p>
        <p>We have received your membership registration. Our team will review your application and get back to you soon.</p>
        <p>You will receive a separate email to set your password and access your member dashboard.</p>
        <p>Best regards,<br>Mahila Swashth Mission</p>
      `,
    });

    return { success: true, data: authData.user };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Failed to submit registration" };
  }
}
