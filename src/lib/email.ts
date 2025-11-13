import nodemailer from "nodemailer";

// Create transporter with GoDaddy SMTP settings
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("⚠️ SMTP credentials not configured");
    return null;
  }

  const port = parseInt(process.env.SMTP_PORT || "587");
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtpout.secureserver.net",
    port: port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });
};

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
  const transporter = createTransporter();

  if (!transporter) {
    console.log("📧 Email mock (SMTP not configured):", { to, subject });
    return { success: true, mock: true };
  }

  try {
    const mailOptions = {
      from: `Mahila Swashthya Mission <${process.env.SMTP_USER || "help@mahilaswashthyamission.in"}>`,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      html,
      attachments: attachments?.map((att) => ({
        filename: att.filename,
        content: att.content,
      })),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return { success: true, data: info };
  } catch (error) {
    console.error("❌ Email error:", error);
    return { success: false, error };
  }
}
