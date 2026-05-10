import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import { ReactElement } from "react";

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: ReactElement;
}) {
  const html = await render(react);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "FamilyCook <noreply@familycook.app>",
      to,
      subject,
      html,
    });
    console.log(`✓ Email sent to ${to}`);
  } catch (error) {
    console.error("✗ Error sending email:", error);
    throw error;
  }
}
