import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { name, email, role, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Aina Productions <noreply@aina-productions.com>',
      to: ['team@aina-productions.com'], // Replace with actual team email
      subject: `New Contact Form Submission${role ? ` - ${role}` : ''}`,
      html: `
        <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #f0ede6;">
          <h1 style="font-family: 'Bebas Neue', sans-serif; color: #e8c547; font-size: 32px; margin-bottom: 20px;">
            New Contact Form Submission
          </h1>
          
          <div style="background-color: #111111; padding: 20px; border-radius: 8px; border: 1px solid #1f1f1f;">
            <div style="margin-bottom: 16px;">
              <strong style="color: #e8c547;">Name:</strong>
              <p style="margin: 4px 0; color: #f0ede6;">${name}</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <strong style="color: #e8c547;">Email:</strong>
              <p style="margin: 4px 0; color: #f0ede6;">${email}</p>
            </div>
            
            ${role ? `
            <div style="margin-bottom: 16px;">
              <strong style="color: #e8c547;">Role:</strong>
              <p style="margin: 4px 0; color: #f0ede6;">${role}</p>
            </div>
            ` : ''}
            
            <div>
              <strong style="color: #e8c547;">Message:</strong>
              <p style="margin: 4px 0; color: #f0ede6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <p style="margin-top: 20px; font-size: 14px; color: #6b6b6b;">
            This message was sent from the Aina Productions website contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}