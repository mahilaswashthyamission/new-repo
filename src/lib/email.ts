import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendEmail({
  to,
  subject,
  html,
  attachments,
}: {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: Buffer | string }>;
}) {
  if (!resend) {
    console.log("📧 Email mock (no RESEND_API_KEY):", { to, subject });
    return { success: true, mock: true };
  }

  try {
    const data = await resend.emails.send({
      from: `Mahila Swashth Mission <${process.env.ORG_EMAIL}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      attachments,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}
