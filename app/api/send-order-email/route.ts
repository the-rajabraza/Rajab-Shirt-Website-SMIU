import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateOrderEmailHTML } from '@/components/order-email-template';

// Email transporter configuration using existing SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();
  
  try {
    console.log(`\n[${timestamp}] 📧 Email Request Received`);
    console.log('='.repeat(60));
    
    const orderData = await request.json();

    // Validate required fields
    if (!orderData.customerInfo?.email || !orderData.orderNumber) {
      console.log(`[${timestamp}] ❌ Validation Failed: Missing required fields`);
      console.log(`   - Email: ${orderData.customerInfo?.email || 'MISSING'}`);
      console.log(`   - Order Number: ${orderData.orderNumber || 'MISSING'}`);
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`[${timestamp}] 📦 Order Details:`);
    console.log(`   - Order Number: ${orderData.orderNumber}`);
    console.log(`   - Customer: ${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`);
    console.log(`   - Email: ${orderData.customerInfo.email}`);
    console.log(`   - Total Amount: Rs. ${orderData.total?.toLocaleString() || 'N/A'}`);
    console.log(`   - Items Count: ${orderData.items?.length || 0}`);

    // Email options
    const mailOptions = {
      from: `"Tee Labs" <${process.env.SMTP_USER}>`,
      to: orderData.customerInfo.email,
      subject: `Order Confirmation - ${orderData.orderNumber} | Tee Labs`,
      html: generateOrderEmailHTML(orderData),
    };

    console.log(`[${timestamp}] 📤 Sending email...`);
    console.log(`   - From: ${process.env.SMTP_USER}`);
    console.log(`   - To: ${orderData.customerInfo.email}`);
    console.log(`   - Subject: ${mailOptions.subject}`);

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log(`[${timestamp}] ✅ Email Sent Successfully!`);
    console.log(`   - Message ID: ${info.messageId}`);
    console.log(`   - Response: ${info.response}`);
    console.log('='.repeat(60));

    return NextResponse.json(
      { message: 'Order confirmation email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(`[${timestamp}] ❌ Email Sending Failed!`);
    console.error('   - Error Type:', error instanceof Error ? error.name : 'Unknown');
    console.error('   - Error Message:', error instanceof Error ? error.message : error);
    console.error('   - Full Error:', error);
    console.log('='.repeat(60));
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
