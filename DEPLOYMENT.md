# Deployment Guide

This guide covers deploying your NGO website to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Sanity project created and content added
- [ ] Razorpay account set up (test or live)
- [ ] Resend account configured for emails
- [ ] Custom domain ready (optional)
- [ ] SSL certificate (handled by platform)

## Vercel Deployment (Recommended)

### Step 1: Prepare Repository

\`\`\`bash
# Ensure code is committed
git add .
git commit -m "Ready for deployment"
git push origin main
\`\`\`

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: \`pnpm build\`
   - Output Directory: .next

### Step 3: Environment Variables

Add all variables from \`.env.example\`:

**Sanity:**
- \`NEXT_PUBLIC_SANITY_PROJECT_ID\`
- \`NEXT_PUBLIC_SANITY_DATASET\`
- \`SANITY_READ_TOKEN\`
- \`SANITY_WRITE_TOKEN\`

**Razorpay:**
- \`RAZORPAY_KEY_ID\` (use live keys for production)
- \`RAZORPAY_KEY_SECRET\`
- \`NEXT_PUBLIC_RAZORPAY_KEY_ID\`

**Email:**
- \`RESEND_API_KEY\`

**Organization:**
- \`ORG_PHONE\`
- \`ORG_WHATSAPP\`
- \`ORG_EMAIL\`
- \`MAPS_EMBED_URL\`

**Site:**
- \`SITE_URL\` (your production URL)
- \`REVALIDATE_SECRET\` (generate a random string)

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Visit your deployment URL

### Step 5: Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning

## Netlify Deployment

### Step 1: Build Settings

\`\`\`toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
\`\`\`

### Step 2: Deploy

1. Connect repository to Netlify
2. Add environment variables
3. Deploy

## Railway Deployment

### Step 1: Create Project

\`\`\`bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Add environment variables
railway variables set KEY=value
\`\`\`

### Step 2: Deploy

\`\`\`bash
railway up
\`\`\`

## Docker Deployment

### Dockerfile

\`\`\`dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
\`\`\`

### Deploy

\`\`\`bash
docker build -t ngo-website .
docker run -p 3000:3000 --env-file .env.local ngo-website
\`\`\`

## Post-Deployment Tasks

### 1. Configure Sanity Webhook

1. Go to Sanity Dashboard
2. Navigate to API > Webhooks
3. Create new webhook:
   - Name: "Production Revalidation"
   - URL: \`https://your-domain.com/api/revalidate?secret=YOUR_SECRET\`
   - Dataset: production
   - Trigger on: Create, Update, Delete
   - HTTP method: POST

### 2. Test Critical Flows

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Forms submit successfully
- [ ] Donation flow completes
- [ ] Email notifications sent
- [ ] Content from Sanity displays
- [ ] Images load properly
- [ ] Mobile responsive
- [ ] SEO metadata present

### 3. Configure Analytics (Optional)

Add Google Analytics or similar:

\`\`\`typescript
// src/app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
\`\`\`

### 4. Set Up Monitoring

Consider adding:
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring (UptimeRobot)

### 5. Security Headers

Add to \`next.config.mjs\`:

\`\`\`javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ];
},
\`\`\`

## Troubleshooting

### Build Fails

- Check Node.js version (18+)
- Verify all dependencies installed
- Check for TypeScript errors
- Review build logs

### Environment Variables Not Working

- Ensure variables are set in platform
- Restart deployment after adding variables
- Check variable names match exactly
- Verify \`NEXT_PUBLIC_\` prefix for client-side variables

### Images Not Loading

- Check Sanity CDN configuration
- Verify \`next.config.mjs\` image domains
- Check image URLs in browser console

### Forms Not Submitting

- Verify API routes are deployed
- Check server action configuration
- Review browser console for errors
- Test with mock data first

### Emails Not Sending

- Verify Resend API key
- Check email logs in Resend dashboard
- Ensure sender email is verified
- Review server logs

## Rollback

If deployment has issues:

### Vercel
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Git
\`\`\`bash
git revert HEAD
git push origin main
\`\`\`

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Review and rotate API keys quarterly
- Backup Sanity data regularly
- Monitor error logs
- Check performance metrics
- Update content regularly

### Updates

\`\`\`bash
# Update dependencies
pnpm update

# Check for security issues
pnpm audit

# Test locally
pnpm dev

# Deploy
git push origin main
\`\`\`

## Support

For deployment issues:
- Check platform documentation
- Review error logs
- Contact platform support
- Open GitHub issue

## Production Checklist

- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] All environment variables set
- [ ] Sanity webhook configured
- [ ] Email sending works
- [ ] Payment processing tested
- [ ] Analytics configured
- [ ] Error monitoring set up
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] Team trained on CMS
- [ ] Support contacts documented

---

Your NGO website is now live! 🎉
