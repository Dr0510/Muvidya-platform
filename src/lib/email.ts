import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, from, replyTo }: SendEmailParams) {
  try {
    const data = await resend.emails.send({
      from: from || "MuVidya <noreply@muvidya.com>",
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo: replyTo || "contact@muvidya.com",
    });

    return { success: true, data };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
}

export function demoRequestConfirmationHtml({ name, schoolName, date }: { name: string; schoolName?: string; date?: string }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 28px; background: linear-gradient(135deg, #6366f1, #22c55e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">MuVidya</h1>
    <p style="color: #6b7280;">STEM Education Platform</p>
  </div>
  <div style="background: #ffffff; border-radius: 12px; padding: 30px; border: 1px solid #e5e7eb;">
    <h2 style="margin-top: 0; color: #1a1a2e;">Demo Request Received! 🚀</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Thank you for your interest in MuVidya's STEM education solutions! We have received your demo request${schoolName ? ` for <strong>${schoolName}</strong>` : ""}.</p>
    ${date ? `<p><strong>Preferred Date:</strong> ${date}</p>` : ""}
    <p>Our team will reach out to you within <strong>24 hours</strong> to confirm the demo schedule and understand your specific requirements.</p>
    <div style="background: #f0fdf4; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin: 0;"><strong>What happens next?</strong></p>
      <ol style="margin-bottom: 0;">
        <li>Our team will call/email to confirm the demo time</li>
        <li>We'll tailor the demo to your curriculum needs</li>
        <li>You'll experience hands-on STEM learning firsthand</li>
      </ol>
    </div>
    <p>In the meantime, feel free to explore our products at <a href="https://muvidya.com/products" style="color: #6366f1;">muvidya.com/products</a></p>
    <p style="margin-bottom: 0;">Best regards,<br><strong>The MuVidya Team</strong></p>
  </div>
  <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
    <p>© ${new Date().getFullYear()} MuVidya. All rights reserved.</p>
    <p>Bengaluru, Karnataka, India</p>
  </div>
</body>
</html>`;
}

export function workshopEnquiryConfirmationHtml({ name, workshopType, schoolName }: { name: string; workshopType?: string; schoolName?: string }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 28px; background: linear-gradient(135deg, #6366f1, #22c55e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">MuVidya</h1>
    <p style="color: #6b7280;">STEM Education Platform</p>
  </div>
  <div style="background: #ffffff; border-radius: 12px; padding: 30px; border: 1px solid #e5e7eb;">
    <h2 style="margin-top: 0; color: #1a1a2e;">Workshop Enquiry Received! 🎯</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Thank you for your workshop enquiry${workshopType ? ` for <strong>${workshopType}</strong>` : ""}${schoolName ? ` at <strong>${schoolName}</strong>` : ""}!</p>
    <p>Our workshop coordination team will get back to you within <strong>24-48 hours</strong> with:</p>
    <ul>
      <li>Available workshop dates and packages</li>
      <li>Pricing and customization options</li>
      <li>Curriculum alignment details</li>
      <li>Required infrastructure and materials</li>
    </ul>
    <p style="margin-bottom: 0;">We're excited to bring STEM learning to your students!</p>
    <p style="margin-bottom: 0;">Best regards,<br><strong>The MuVidya Team</strong></p>
  </div>
  <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
    <p>© ${new Date().getFullYear()} MuVidya. All rights reserved.</p>
    <p>Bengaluru, Karnataka, India</p>
  </div>
</body>
</html>`;
}

export function newLeadNotificationHtml({ name, email, phone, company, source }: { name: string; email: string; phone?: string; company?: string; source?: string }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 28px; background: linear-gradient(135deg, #6366f1, #22c55e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">MuVidya</h1>
    <p style="color: #6b7280;">Admin Notification</p>
  </div>
  <div style="background: #ffffff; border-radius: 12px; padding: 30px; border: 1px solid #e5e7eb;">
    <h2 style="margin-top: 0; color: #1a1a2e;">🔔 New Lead Captured</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #6b7280;">Name:</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td></tr>
      ${phone ? `<tr><td style="padding: 8px 0; color: #6b7280;">Phone:</td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
      ${company ? `<tr><td style="padding: 8px 0; color: #6b7280;">Institution:</td><td style="padding: 8px 0;">${company}</td></tr>` : ""}
      ${source ? `<tr><td style="padding: 8px 0; color: #6b7280;">Source:</td><td style="padding: 8px 0;">${source}</td></tr>` : ""}
    </table>
    <div style="margin-top: 20px;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}/leads" style="background: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">View in Dashboard</a>
    </div>
  </div>
</body>
</html>`;
}

export function contactAutoReplyHtml({ name }: { name: string }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 28px; background: linear-gradient(135deg, #6366f1, #22c55e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">MuVidya</h1>
    <p style="color: #6b7280;">STEM Education Platform</p>
  </div>
  <div style="background: #ffffff; border-radius: 12px; padding: 30px; border: 1px solid #e5e7eb;">
    <h2 style="margin-top: 0; color: #1a1a2e;">Thank You for Reaching Out! ✉️</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>We've received your message and our team will get back to you within <strong>24 hours</strong>.</p>
    <p>If your enquiry is urgent, feel free to contact us directly:</p>
    <p>📞 <strong>+91 9022477635</strong><br>💬 <strong>WhatsApp:</strong> Available on our website</p>
    <p style="margin-bottom: 0;">Best regards,<br><strong>The MuVidya Team</strong></p>
  </div>
</body>
</html>`;
}

export function newsletterWelcomeHtml({ email }: { email: string }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 28px; background: linear-gradient(135deg, #6366f1, #22c55e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">MuVidya</h1>
    <p style="color: #6b7280;">STEM Education Platform</p>
  </div>
  <div style="background: #ffffff; border-radius: 12px; padding: 30px; border: 1px solid #e5e7eb;">
    <h2 style="margin-top: 0; color: #1a1a2e;">Welcome to MuVidya! 🎉</h2>
    <p>Hi there,</p>
    <p>Thank you for subscribing to the MuVidya newsletter! You'll now receive:</p>
    <ul>
      <li>📚 Latest STEM education resources and tips</li>
      <li>🔬 New product and workshop announcements</li>
      <li>🏆 Student success stories and project showcases</li>
      <li>🎁 Exclusive offers and early-bird discounts</li>
    </ul>
    <p>We're excited to have you as part of our community of future innovators!</p>
    <p style="margin-bottom: 0;">Best regards,<br><strong>The MuVidya Team</strong></p>
  </div>
  <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
    <p>You received this because ${email} subscribed to MuVidya newsletter.</p>
    <p>© ${new Date().getFullYear()} MuVidya. All rights reserved.</p>
  </div>
</body>
</html>`;
}