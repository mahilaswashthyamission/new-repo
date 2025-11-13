# GoDaddy Email Setup Guide

## Overview
The application now uses Nodemailer with GoDaddy SMTP to send emails.

## Configuration

### 1. Environment Variables

Add these to your `.env.local` file:

```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_USER=help@mahilaswashthyamission.in
SMTP_PASS=your_actual_email_password
```

### 2. GoDaddy Email Settings

**SMTP Server Details:**
- **Host**: `smtp.secureserver.net` (or `smtpout.secureserver.net`)
- **Port**: `587` (TLS - Recommended) or `465` (SSL)
- **Security**: STARTTLS for 587, SSL for 465
- **Username**: Your full email address (`help@mahilaswashthyamission.in`)
- **Password**: Your email password (same as webmail login)

### 3. Get Your Email Password

1. Log in to your GoDaddy account
2. Go to **Email & Office** → **Manage**
3. Find your email account
4. If you don't know the password, you can reset it

### 4. Testing

To test if emails are working:

1. Make sure SMTP credentials are set in `.env.local`
2. Try the contact form or make a test donation
3. Check the console logs for:
   - ✅ Email sent: [message-id]
   - Or ❌ Email error: [error details]

## Troubleshooting

### "SMTP not configured" message
- Make sure `SMTP_USER` and `SMTP_PASS` are set in `.env.local`
- Restart your development server after adding environment variables

### Authentication failed
- Double-check your email password
- Make sure you're using the full email address as username
- Try resetting your email password in GoDaddy

### Connection timeout
- Check if port 465 is blocked by your firewall
- Try using port 587 with TLS instead:
  ```env
  SMTP_PORT=587
  ```

### Emails not being received
- Check spam/junk folder
- Verify the sender email is correct
- Check GoDaddy email logs in your account

## Email Features

The application sends emails for:
- ✅ Donation receipts (with PDF attachment)
- ✅ Contact form submissions
- ✅ Registration confirmations
- ✅ Job application confirmations

## Security Notes

- Never commit `.env.local` to version control
- Keep your email password secure
- Consider using an app-specific password if available
- For production, use environment variables in your hosting platform

## Alternative: Port 587 (TLS)

If port 465 doesn't work, try TLS on port 587:

```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_USER=help@mahilaswashthyamission.in
SMTP_PASS=your_actual_email_password
```

Update the email library to use `secure: false` for port 587.

## Production Deployment

When deploying to Vercel/Netlify:

1. Add environment variables in your hosting dashboard:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`

2. Make sure these are marked as "secret" or "encrypted"

3. Redeploy your application

## Support

If you continue to have issues:
- Contact GoDaddy support for SMTP access
- Check GoDaddy's SMTP documentation
- Verify your email account is active and not suspended
