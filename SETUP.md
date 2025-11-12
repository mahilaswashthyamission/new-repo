# Quick Setup Guide

## 1. Install Dependencies

\`\`\`bash
pnpm install
\`\`\`

## 2. Set Up Sanity

\`\`\`bash
cd sanity
pnpm install

# Initialize Sanity (creates project)
pnpm sanity init

# Note your Project ID and Dataset
\`\`\`

## 3. Configure Environment

Copy \`.env.example\` to \`.env.local\`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit \`.env.local\` with your values:

### Required for Basic Functionality:
- \`NEXT_PUBLIC_SANITY_PROJECT_ID\` - From Sanity dashboard
- \`NEXT_PUBLIC_SANITY_DATASET\` - Usually "production"
- \`SANITY_READ_TOKEN\` - Create in Sanity: Settings > API > Tokens
- \`SANITY_WRITE_TOKEN\` - Create with Editor permissions

### Required for Full Features:
- \`RAZORPAY_KEY_ID\` - Get from razorpay.com (test mode)
- \`RAZORPAY_KEY_SECRET\` - From Razorpay dashboard
- \`NEXT_PUBLIC_RAZORPAY_KEY_ID\` - Same as RAZORPAY_KEY_ID
- \`RESEND_API_KEY\` - Get from resend.com (optional, will mock if missing)

### Organization Details:
- \`ORG_PHONE\` - Your phone number (e.g., +919876543210)
- \`ORG_WHATSAPP\` - WhatsApp number without + (e.g., 919876543210)
- \`ORG_EMAIL\` - Your email address
- \`SITE_URL\` - Your website URL (for production)
- \`REVALIDATE_SECRET\` - Random string for webhook security

## 4. Run Development Servers

### Terminal 1 - Next.js:
\`\`\`bash
pnpm dev
\`\`\`

### Terminal 2 - Sanity Studio:
\`\`\`bash
cd sanity
pnpm dev
\`\`\`

## 5. Access Applications

- **Website:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

## 6. Add Content

1. Go to http://localhost:3000/studio
2. Add content for each type:
   - Programs (create 3-6 programs)
   - News Posts (create 3-5 posts)
   - Team Members (add your team)
   - FAQs (add 5-10 questions)
   - Jobs (if you have openings)
   - Documents (upload PDFs)
   - Albums (for gallery)

## 7. Test Features

### Test Donation Flow:
1. Go to http://localhost:3000/donation
2. Fill form with test data
3. Use Razorpay test mode (no real payment)

### Test Registration:
1. Go to http://localhost:3000/registration
2. Fill and submit form
3. Check Sanity for new application

### Test Contact Form:
1. Go to http://localhost:3000/contact
2. Submit message
3. Check console for email mock (if no Resend key)

## 8. Deploy

### Vercel (Recommended):
1. Push code to GitHub
2. Import in Vercel
3. Add all environment variables
4. Deploy

### Set Up Webhook:
1. In Sanity Dashboard: API > Webhooks
2. Add webhook URL: \`https://your-domain.com/api/revalidate?secret=YOUR_SECRET\`
3. Trigger on: Create, Update, Delete

## Troubleshooting

### "Cannot find module" errors:
\`\`\`bash
rm -rf node_modules .next
pnpm install
\`\`\`

### Sanity connection issues:
- Check Project ID in \`.env.local\`
- Verify API token has correct permissions
- Check CORS settings in Sanity dashboard

### Build errors:
\`\`\`bash
pnpm build
\`\`\`
Check console for specific errors

## Next Steps

1. Customize branding in \`tailwind.config.ts\`
2. Update organization details in Footer
3. Add your logo and images
4. Configure Google Maps embed URL
5. Set up production Razorpay account
6. Configure custom domain

## Support

Check README.md for detailed documentation.
