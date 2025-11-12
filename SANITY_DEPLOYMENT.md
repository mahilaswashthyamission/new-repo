# Sanity Studio Deployment Guide

Your Sanity Studio is configured to deploy in **two ways**:

## Option 1: Embedded in Next.js (Recommended) ✅

Your Studio is already set up to be embedded at `/studio` route in your Next.js app.

### How it works:
- Studio is accessible at `https://your-domain.com/studio`
- Deploys automatically with your Next.js app on Vercel
- No separate deployment needed
- Uses `basePath: '/studio'` in `sanity.config.ts`

### Deployment Steps:
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables (see below)
   - Deploy

3. **Access Studio**
   - Visit `https://your-domain.vercel.app/studio`
   - Sign in with your Sanity account

### Required Environment Variables in Vercel:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=cm0meu1e
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_READ_TOKEN=your_read_token
SANITY_WRITE_TOKEN=your_write_token
```

### Configure CORS in Sanity:
1. Go to https://sanity.io/manage
2. Select your project
3. Go to Settings → API → CORS Origins
4. Add your Vercel domain: `https://your-domain.vercel.app`
5. Allow credentials: ✅

---

## Option 2: Standalone Sanity Studio (Alternative)

If you prefer a separate Studio deployment on Sanity's hosting:

### Deploy Command:
```bash
npm run sanity:deploy
```

This will:
- Build and deploy Studio to Sanity's hosting
- Give you a URL like: `https://your-project.sanity.studio`
- Separate from your main website

### Steps:
1. **Login to Sanity CLI**
   ```bash
   npx sanity login
   ```

2. **Deploy Studio**
   ```bash
   npm run sanity:deploy
   ```

3. **Choose a hostname** when prompted

4. **Access Studio**
   - Visit the provided URL
   - Sign in with your Sanity account

---

## Comparison

| Feature | Embedded (/studio) | Standalone |
|---------|-------------------|------------|
| URL | `your-domain.com/studio` | `project.sanity.studio` |
| Deployment | With Next.js | Separate |
| Hosting | Vercel | Sanity |
| Updates | Automatic with app | Manual deploy |
| Custom Domain | Yes | Limited |
| **Recommended** | ✅ Yes | For team access |

---

## Current Setup (Embedded)

Your project is configured for **embedded deployment**:

```typescript
// sanity/sanity.config.ts
export default defineConfig({
  basePath: '/studio',  // Embedded at /studio route
  projectId: 'cm0meu1e',
  dataset: 'production',
  // ...
});
```

The Studio route is automatically available in your Next.js app and will deploy with it.

---

## Post-Deployment Checklist

After deploying to Vercel:

1. ✅ Add Vercel domain to Sanity CORS settings
2. ✅ Test Studio access at `/studio`
3. ✅ Verify content fetching on frontend
4. ✅ Set up Sanity webhook for revalidation:
   - URL: `https://your-domain.com/api/revalidate?secret=YOUR_SECRET`
   - Trigger on: Create, Update, Delete

---

## Troubleshooting

### Studio not loading?
- Check CORS settings in Sanity dashboard
- Verify environment variables in Vercel
- Check browser console for errors

### Can't authenticate?
- Ensure you're logged into Sanity
- Check if your email has access to the project
- Verify CORS allows credentials

### Content not updating?
- Set up Sanity webhook for ISR revalidation
- Check `REVALIDATE_SECRET` environment variable
- Manually trigger revalidation via API route

---

## Security Notes

- Studio is protected by Sanity authentication
- Only users with project access can edit content
- Use read tokens for public data fetching
- Use write tokens only in server-side code
- Never expose write tokens in client-side code

---

## Recommended: Embedded Deployment

Your current setup uses **embedded deployment**, which is the recommended approach because:
- ✅ Single deployment process
- ✅ Same domain for website and CMS
- ✅ Automatic updates with your app
- ✅ Better for SEO and user experience
- ✅ Easier to manage

Just deploy your Next.js app to Vercel, and the Studio will be available at `/studio`!
