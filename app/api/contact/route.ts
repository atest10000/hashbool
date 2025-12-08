import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'الاسم والبريد الإلكتروني والرسالة مطلوبة' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني غير صحيح' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? phone.trim() : '';
    const sanitizedMessage = message.trim();

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP credentials not configured. Please set SMTP_USER and SMTP_PASSWORD environment variables.');
      return NextResponse.json(
        { error: 'خدمة البريد الإلكتروني غير مُعدة' },
        { status: 500 }
      );
    }

    // Create nodemailer transporter
    // For production, use environment variables for SMTP credentials
    // For Gmail, you'll need to set up an App Password
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      // Optional: Add connection timeout
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP connection verification failed:', verifyError);
      return NextResponse.json(
        { error: 'فشل الاتصال بخادم البريد الإلكتروني' },
        { status: 500 }
      );
    }

    // Email content with nodemailer
    const mailOptions = {
      from: `"${sanitizedName}" <${process.env.SMTP_USER}>`,
      replyTo: sanitizedEmail,
      to: 'hashbool@gmail.com',
      subject: `رسالة جديدة من نموذج الاتصال - ${sanitizedName}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Cairo', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">رسالة جديدة من نموذج الاتصال</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <p style="margin: 15px 0;"><strong style="color: #667eea;">الاسم:</strong> ${sanitizedName}</p>
            <p style="margin: 15px 0;"><strong style="color: #667eea;">البريد الإلكتروني:</strong> <a href="mailto:${sanitizedEmail}" style="color: #667eea; text-decoration: none;">${sanitizedEmail}</a></p>
            ${sanitizedPhone ? `<p style="margin: 15px 0;"><strong style="color: #667eea;">الهاتف:</strong> <a href="tel:${sanitizedPhone}" style="color: #667eea; text-decoration: none;">${sanitizedPhone}</a></p>` : ''}
            <div style="margin-top: 25px; padding-top: 25px; border-top: 2px solid #e0e0e0;">
              <p style="margin-bottom: 10px;"><strong style="color: #667eea;">الرسالة:</strong></p>
              <p style="background: white; padding: 15px; border-radius: 5px; border-right: 3px solid #667eea; white-space: pre-wrap;">${sanitizedMessage.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        رسالة جديدة من نموذج الاتصال
        
        الاسم: ${sanitizedName}
        البريد الإلكتروني: ${sanitizedEmail}
        ${sanitizedPhone ? `الهاتف: ${sanitizedPhone}` : ''}
        
        الرسالة:
        ${sanitizedMessage}
      `,
    };

    // Send email using nodemailer
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { message: 'تم إرسال البريد الإلكتروني بنجاح', messageId: info.messageId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email with nodemailer:', error);
    
    // Provide more specific error messages
    if (error.code === 'EAUTH') {
      return NextResponse.json(
        { error: 'فشل المصادقة. يرجى التحقق من بيانات اعتماد البريد الإلكتروني' },
        { status: 500 }
      );
    }
    
    if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      return NextResponse.json(
        { error: 'فشل الاتصال بخادم البريد الإلكتروني' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'فشل إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى' },
      { status: 500 }
    );
  }
}

