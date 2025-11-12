# Complete Vercel Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- ✅ GitHub repository with your code pushed
- ✅ Sanity project created (projectId: cm0meu1e)
- ✅ Supabase project created
- ✅ Razorpay account (test or live keys)
- ✅ Resend account for emails

---

## Step 1: Push Code to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Ready for Vercel deployment"

# Push to GitHub
git push origin main
```

---

## Step 2: Sign Up / Sign In to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

---

## Step 3: Import Your Project

1. Click "Add New..." → "Project"
2. Find your repository: `webflow-ai/mahilaswashth`
3. Click "Import"

---

## Step 4: Configure Project Settings

### Framework Preset
- Vercel should auto-detect: **Next.js**
- If not, select it manually

### Root Directory
- Leave as: `.` (root)

### Build Settings
- Build Command: `npm run build` (auto-detected)
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install --legacy-peer-deps`

**Important:** Add `--legacy-peer-deps` to Install Command:
```
npm install --legacy-peer-deps
```

---

## Step 5: Add Environment Variables

Click "Environment Variables" and add these:

### Sanity CMS
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=cm0meu1e
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_READ_TOKEN=your_sanity_read_token
SANITY_WRITE_TOKEN=your_sanity_write_token
```

### Supabase
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
```

### Razorpay
```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

### Resend Email
```env
RESEND_API_KEY=re_xxxxx
```

### Organization Details
```env
ORG_PHONE=+919876543210
ORG_WHATSAPP=919876543210
ORG_EMAIL=info@mahilaswashth.org
MAPS_EMBED_URL=https://www.google.com/maps/embed?pb=xxxxx
```

### Site Configuration
```env
SITE_URL=https://your-project.vercel.app
REVALIDATE_SECRET=your_random_secret_here
NODE_ENV=production
```

**Tip:** Generate a random secret for REVALIDATE_SECRET:
```bash
openssl rand -base64 32
```

---

## Step 6: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Once done, you'll get a URL like: `https://your-project.vercel.app`

---

## Step 7: Post-Deployment Configuration

### A. Configure Sanity CORS

1. Go to https://sanity.io/manage
2. Select your project
3. Go to **Settings → API → CORS Origins**
4. Click "Add CORS origin"
5. Add your Vercel URL: `https://your-project.vercel.app`
6. Check "Allow credentials"
7. Save

### B. Set Up Sanity Webhook (for auto-revalidation)

1. In Sanity dashboard: **API → Webhooks**
2. Click "Create webhook"
3. Configure:
   - **Name:** Vercel Revalidation
   - **URL:** `https://your-project.vercel.app/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
   - **Dataset:** production
   - **Trigger on:** Create, Update, Delete
   - **Filter:** Leave empty (all documents)
4. Save

### C. Update Supabase Redirect URLs

1. Go to Supabase Dashboard
2. **Authentication → URL Configuration**
3. Add to **Redirect URLs:**
   - `https://your-project.vercel.app/auth/callback`
   - `https://your-project.vercel.app/dashboard`
4. Set **Site URL:** `https://your-project.vercel.app`
5. Save

### D. Update Razorpay Webhook (Optional)

1. Go to Razorpay Dashboard
2. **Settings → Webhooks**
3. Add webhook URL: `https://your-project.vercel.app/api/razorpay/webhook`
4. Select events: payment.captured, payment.failed
5. Save

---

## Step 8: Test Your Deployment

### Test Website
- Visit: `https://your-project.vercel.app`
- Check all pages load correctly

### Test Sanity Studio
- Visit: `https://your-project.vercel.app/studio`
- Sign in with your Sanity account
- Try creating/editing content

### Test Authentication
- Go to: `https://your-project.vercel.app/registration`
- Register a test account
- Check email for password setup
- Sign in at: `https://your-project.vercel.app/auth/signin`

### Test Donations
- Go to: `https://your-project.vercel.app/donation`
- Try a test donation with Razorpay test cards

---

## Step 9: Custom Domain (Optional)

### Add Your Domain

1. In Vercel project: **Settings → Domains**
2. Click "Add"
3. Enter your domain: `mahilaswashth.org`
4. Follow DNS configuration instructions

### Update DNS Records

Add these records in your domain registrar:

**For root domain (mahilaswashth.org):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Update Environment Variables

After adding custom domain, update:
```env
SITE_URL=https://mahilaswashth.org
```

And update all redirect URLs in:
- Sanity CORS
- Supabase redirect URLs
- Razorpay webhooks

---

## Troubleshooting

### Build Fails?
- Check if `--legacy-peer-deps` is in install command
- Verify all environment variables are set
- Check build logs for specific errors

### Studio Not Loading?
- Verify Sanity CORS includes your Vercel domain
- Check SANITY_PROJECT_ID matches your project
- Clear browser cache and try again

### Authentication Issues?
- Verify Supabase redirect URLs are correct
- Check SUPABASE_SERVICE_ROLE_KEY is set
- Test with a new incognito window

### Images Not Loading?
- Check Sanity CDN is accessible
- Verify next.config.mjs has correct image domains
- Check browser console for CORS errors

### Emails Not Sending?
- Verify RESEND_API_KEY is correct
- Check Resend dashboard for delivery status
- Verify sender email is verified in Resend

---

## Monitoring & Analytics

### Vercel Analytics
- Go to your project → Analytics
- View page views, performance metrics
- Monitor Core Web Vitals

### Error Tracking
- Check: Project → Logs
- Filter by errors
- Set up error notifications

---

## Continuous Deployment

Every time you push to GitHub:
1. Vercel automatically detects changes
2. Builds and deploys new version
3. Zero downtime deployment
4. Automatic rollback on errors

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically deploys!
```

---

## Environment Variables by Service

### Where to Find Them:

**Sanity:**
- Dashboard: https://sanity.io/manage
- Settings → API → Tokens

**Supabase:**
- Dashboard: https://supabase.com/dashboard
- Settings → API

**Razorpay:**
- Dashboard: https://dashboard.razorpay.com
- Settings → API Keys

**Resend:**
- Dashboard: https://resend.com/api-keys
- Create API Key

---

## Quick Checklist

Before deploying:
- [ ] Code pushed to GitHub
- [ ] All environment variables ready
- [ ] Sanity project created
- [ ] Supabase project created
- [ ] Razorpay account set up
- [ ] Resend account set up

After deploying:
- [ ] Sanity CORS configured
- [ ] Sanity webhook set up
- [ ] Supabase redirect URLs updated
- [ ] Test all features
- [ ] Custom domain added (optional)

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console errors
3. Verify all environment variables
4. Check service dashboards (Sanity, Supabase, etc.)
5. Refer to service-specific documentation

---

## Next Steps After Deployment

1. **Add Content** - Use Studio to add programs, news, team members
2. **Test Forms** - Try registration, contact, donation forms
3. **Monitor** - Check Vercel analytics and logs
4. **Optimize** - Review performance metrics
5. **Promote** - Share your live website!

Your website will be live at: `https://your-project.vercel.app` 🚀
