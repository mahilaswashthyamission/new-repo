# Quick Start Guide - 5 Minutes to Running

Get your NGO website running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- pnpm installed (\`npm install -g pnpm\`)
- A Sanity account (free at sanity.io)

## Step 1: Install (1 minute)

\`\`\`bash
# Install dependencies
pnpm install
\`\`\`

## Step 2: Sanity Setup (2 minutes)

\`\`\`bash
# Go to sanity folder
cd sanity

# Install Sanity dependencies
pnpm install

# Initialize Sanity project
pnpm sanity init

# Follow prompts:
# - Login/Create account
# - Create new project
# - Use default dataset (production)
# - Note your Project ID

# Go back to root
cd ..
\`\`\`

## Step 3: Environment Variables (1 minute)

\`\`\`bash
# Copy example env file
cp .env.example .env.local
\`\`\`

Edit \`.env.local\` and add **minimum required**:

\`\`\`env
# From Sanity dashboard
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Create in Sanity: Settings > API > Tokens
SANITY_READ_TOKEN=your_read_token
SANITY_WRITE_TOKEN=your_write_token

# Your details
ORG_PHONE=+919557513058
ORG_WHATSAPP=919557513058
ORG_EMAIL=help@mahilaswashthyamission.in
SITE_URL=http://localhost:3000
REVALIDATE_SECRET=any_random_string_here
\`\`\`

**Optional (for full features):**
- RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET (for donations)
- RESEND_API_KEY (for emails, will mock if missing)

## Step 4: Run (1 minute)

Open **two terminals**:

### Terminal 1 - Next.js:
\`\`\`bash
pnpm dev
\`\`\`

### Terminal 2 - Sanity Studio:
\`\`\`bash
cd sanity
pnpm dev
\`\`\`

## Step 5: Add Content

1. Open http://localhost:3000/studio
2. Add some content:
   - Create 2-3 Programs
   - Add 2-3 News Posts
   - Add 5-10 FAQs
   - Add Team Members

## Done! 🎉

Visit http://localhost:3000 to see your website!

## Next Steps

1. **Customize branding** - Edit colors in \`tailwind.config.ts\`
2. **Add your logo** - Update in Sanity Page Settings
3. **Configure Razorpay** - For donation processing
4. **Set up Resend** - For email notifications
5. **Deploy** - See DEPLOYMENT.md

## Common Issues

### "Cannot connect to Sanity"
- Check Project ID in .env.local
- Verify API token has correct permissions
- Check CORS settings in Sanity dashboard

### "Module not found"
\`\`\`bash
rm -rf node_modules .next
pnpm install
\`\`\`

### "Port already in use"
- Change port: \`pnpm dev -p 3001\`
- Or kill process using port 3000

## Need Help?

- Check README.md for detailed docs
- See SETUP.md for troubleshooting
- Review DEPLOYMENT.md for production

---

**You're all set!** Start customizing your NGO website.
