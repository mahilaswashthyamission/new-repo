# NGO Website - Next.js 15 with Sanity CMS

A production-ready, full-featured NGO website built with Next.js 15 (App Router), Tailwind CSS, and Sanity CMS. Includes donation processing, membership registration, job applications, and comprehensive content management.

## Features

- ✅ **Next.js 15** with App Router and Server Actions
- ✅ **Sanity CMS** for content management
- ✅ **Razorpay Integration** for donations with receipt generation
- ✅ **Email Notifications** via Resend
- ✅ **Form Validation** with Zod and React Hook Form
- ✅ **Responsive Design** with Tailwind CSS and Shadcn/ui
- ✅ **SEO Optimized** with metadata, OpenGraph, and JSON-LD
- ✅ **Accessibility** compliant (WCAG AA)
- ✅ **Floating Call/WhatsApp** buttons
- ✅ **ISR Revalidation** API for Sanity webhooks

## Tech Stack

- **Framework:** Next.js 15 (TypeScript)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **CMS:** Sanity
- **Payments:** Razorpay
- **Email:** Resend
- **Validation:** Zod
- **Forms:** React Hook Form
- **Animations:** Framer Motion
- **SEO:** next-seo, next-sitemap

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Sanity account (free at sanity.io)
- Razorpay account (for donations)
- Resend account (for emails)

### Installation

1. **Clone and install dependencies:**

\`\`\`bash
pnpm install
\`\`\`

2. **Set up Sanity:**

\`\`\`bash
# Create a new Sanity project
cd sanity
pnpm install
pnpm sanity init

# Follow the prompts to create a project
# Note your Project ID and Dataset name
\`\`\`

3. **Configure environment variables:**

Copy \`.env.example\` to \`.env.local\` and fill in your values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Required variables:
- \`NEXT_PUBLIC_SANITY_PROJECT_ID\` - Your Sanity project ID
- \`NEXT_PUBLIC_SANITY_DATASET\` - Usually "production"
- \`SANITY_READ_TOKEN\` - Create in Sanity dashboard (Settings > API)
- \`SANITY_WRITE_TOKEN\` - Create with write permissions
- \`RAZORPAY_KEY_ID\` - From Razorpay dashboard
- \`RAZORPAY_KEY_SECRET\` - From Razorpay dashboard
- \`NEXT_PUBLIC_RAZORPAY_KEY_ID\` - Same as RAZORPAY_KEY_ID
- \`RESEND_API_KEY\` - From resend.com
- \`ORG_PHONE\` - Your organization phone
- \`ORG_WHATSAPP\` - WhatsApp number (without +)
- \`ORG_EMAIL\` - Your organization email
- \`SITE_URL\` - Your website URL
- \`REVALIDATE_SECRET\` - Random secret for revalidation

4. **Run development servers:**

\`\`\`bash
# Terminal 1: Next.js
pnpm dev

# Terminal 2: Sanity Studio
cd sanity
pnpm dev
\`\`\`

5. **Access the applications:**

- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## Content Management

### Adding Content in Sanity Studio

1. Navigate to http://localhost:3000/studio
2. Create content for each schema:
   - **Programs:** Add upcoming and completed programs
   - **News Posts:** Publish news and updates
   - **Team Members:** Add team member profiles
   - **Albums:** Create photo/video galleries
   - **Documents:** Upload PDFs for download
   - **FAQs:** Add frequently asked questions
   - **Jobs:** Post job openings
   - **Page Settings:** Configure organization details

### Sample Data

The project includes schemas for:
- 6 Programs (3 Upcoming, 3 Completed)
- 5 News Posts
- 6 Team Members
- 2 Albums
- 5 Documents
- 10 FAQs
- 2 Jobs

Create these manually in Sanity Studio or import via Sanity CLI.

## Razorpay Configuration

### Test Mode Setup

1. Sign up at https://razorpay.com
2. Get test API keys from Dashboard > Settings > API Keys
3. Add keys to \`.env.local\`
4. Test with Razorpay test cards: https://razorpay.com/docs/payments/payments/test-card-details/

### Production Setup

1. Complete KYC verification
2. Switch to live mode in dashboard
3. Update environment variables with live keys
4. Configure webhooks for payment notifications

## Email Configuration

### Resend Setup

1. Sign up at https://resend.com
2. Verify your domain or use test mode
3. Create API key
4. Add to \`.env.local\`

If \`RESEND_API_KEY\` is not set, emails will be mocked (logged to console).

## Revalidation Webhook

Set up a webhook in Sanity to revalidate pages on content changes:

1. Go to Sanity Dashboard > API > Webhooks
2. Create new webhook:
   - URL: \`https://your-domain.com/api/revalidate?secret=YOUR_SECRET\`
   - Dataset: production
   - Trigger on: Create, Update, Delete
3. Add \`REVALIDATE_SECRET\` to environment variables

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the project:

\`\`\`bash
pnpm build
\`\`\`

Start production server:

\`\`\`bash
pnpm start
\`\`\`

## Project Structure

\`\`\`
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (pages)/           # Route groups
│   │   ├── actions/           # Server Actions
│   │   ├── api/               # API routes
│   │   └── studio/            # Sanity Studio
│   ├── components/            # React components
│   │   └── ui/               # Shadcn/ui components
│   └── lib/                   # Utilities and configs
├── sanity/                    # Sanity CMS
│   └── schemas/              # Content schemas
├── public/                    # Static assets
└── package.json
\`\`\`

## Key Pages

- \`/\` - Home with hero, programs, news, impact stats
- \`/about\` - About us, mission, vision
- \`/programs\` - Programs list with filters
- \`/programs/[slug]\` - Program details
- \`/team\` - Team members grid
- \`/gallery\` - Photo/video albums
- \`/news\` - News listing
- \`/news/[slug]\` - News article
- \`/jobs\` - Job openings
- \`/jobs/[slug]\` - Job details
- \`/documents\` - Downloadable documents
- \`/registration\` - Membership registration form
- \`/contact\` - Contact form with map
- \`/donation\` - Donation page with Razorpay
- \`/faqs\` - Frequently asked questions
- \`/why-us\` - Trust markers and impact
- \`/applications\` - Application info
- \`/how-to-apply\` - Application guide
- \`/privacy-policy\` - Privacy policy
- \`/refund-policy\` - Refund policy
- \`/terms\` - Terms and conditions

## Forms

All forms include:
- Client-side validation with Zod
- Server Actions for processing
- Email notifications
- Success/error states
- Accessibility features

### Available Forms

1. **Membership Registration** (\`/registration\`)
2. **Contact Form** (\`/contact\`)
3. **Donation Form** (\`/donation\`)
4. **Job Application** (from job detail pages)

## Customization

### Branding

Update colors in \`tailwind.config.ts\`:

\`\`\`typescript
colors: {
  primary: "hsl(142 76% 36%)", // Change this
  // ...
}
\`\`\`

### Organization Details

Update in:
- \`.env.local\` for phone, email, WhatsApp
- Sanity Page Settings for logo, address, social links
- \`src/components/Footer.tsx\` for footer content

### Floating Buttons

Configure in \`src/components/FloatingCallWhatsApp.tsx\` or via environment variables.

## SEO

- Metadata configured in each page
- OpenGraph and Twitter cards
- JSON-LD structured data
- Sitemap auto-generated at \`/sitemap.xml\`
- Robots.txt at \`/robots.txt\`

## Accessibility

- WCAG AA compliant
- Keyboard navigation
- Focus indicators
- Alt text on images
- Semantic HTML
- ARIA labels

## Performance

- Server Components by default
- Image optimization with next/image
- ISR for dynamic pages
- Code splitting
- Lazy loading

## Support

For issues or questions:
- Email: ${process.env.ORG_EMAIL || "info@ngo.org"}
- GitHub Issues: [Create an issue]

## License

MIT License - feel free to use for your NGO!

---

Built with ❤️ for social impact
\`\`\`
