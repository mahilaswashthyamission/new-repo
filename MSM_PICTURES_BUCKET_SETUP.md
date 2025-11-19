# MSM Pictures Bucket Setup Guide

This guide explains how to set up the `msm_pictures` Supabase storage bucket for the infinite carousel on your website.

## Quick Setup

### Step 1: Run the SQL Script

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the contents of `MSM_PICTURES_BUCKET_SETUP.sql`
5. Click **Run** to execute the script

### Step 2: Verify Bucket Creation

1. Go to **Storage** in your Supabase Dashboard
2. You should see a bucket named `msm_pictures`
3. The bucket should be marked as **Public**

### Step 3: Upload Images

1. Click on the `msm_pictures` bucket
2. Click **Upload file** button
3. Select and upload your images (JPEG, PNG, WebP, or GIF)
4. Images will automatically appear in the carousel on your homepage

## Bucket Configuration

### Current Settings

- **Bucket Name**: `msm_pictures`
- **Public Access**: Enabled (for read operations)
- **File Size Limit**: 10MB per file
- **Allowed File Types**: JPEG, JPG, PNG, WebP, GIF

### Access Policies

#### Public Read Access
- ✅ Anyone can view and download images
- ✅ Perfect for displaying on your public website
- ✅ No authentication required

#### Authenticated Write Access
- ✅ Only logged-in users can upload images
- ✅ Users can update/delete their own uploads
- ❌ Anonymous users cannot upload

## Alternative: Admin-Only Access

If you want only administrators to manage images:

1. Uncomment the "Admin-only" section in the SQL file
2. Comment out the "Authenticated users" policies
3. Set up admin roles in your Supabase Auth configuration
4. Add `role: 'admin'` to user metadata for admin users

## Folder Organization (Optional)

You can organize images in folders for better management:

```
msm_pictures/
├── programs/
│   ├── health-camp-2024.jpg
│   └── workshop-march.jpg
├── events/
│   ├── annual-meet.jpg
│   └── celebration.jpg
└── team/
    ├── team-photo-1.jpg
    └── team-photo-2.jpg
```

## Getting Image URLs

### In Your Code

```typescript
// Get public URL for an image
const { data } = supabase
  .storage
  .from('msm_pictures')
  .getPublicUrl('image-name.jpg');

console.log(data.publicUrl);
```

### Direct URL Format

```
https://[your-project-ref].supabase.co/storage/v1/object/public/msm_pictures/image-name.jpg
```

## Troubleshooting

### Images Not Showing

1. **Check bucket is public**:
   - Go to Storage → msm_pictures → Settings
   - Ensure "Public bucket" is enabled

2. **Verify policies are active**:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'objects' 
   AND policyname LIKE '%msm_pictures%';
   ```

3. **Check file permissions**:
   - Ensure files are uploaded successfully
   - Verify file names don't have special characters

### Upload Errors

1. **File too large**: Reduce image size or increase limit in SQL
2. **Wrong file type**: Only image files are allowed
3. **Not authenticated**: User must be logged in to upload

## Security Recommendations

### 1. File Validation
- Validate file types on upload
- Scan for malicious content
- Limit file sizes appropriately

### 2. Access Control
- Use admin-only policies for production
- Implement approval workflow for uploads
- Regular audit of uploaded content

### 3. Monitoring
- Set up storage usage alerts
- Monitor for unusual upload patterns
- Track public access logs

### 4. Backup Strategy
- Regular backups of important images
- Version control for critical assets
- Disaster recovery plan

## Image Optimization Tips

### Before Uploading

1. **Resize images**: Recommended max width 1920px
2. **Compress images**: Use tools like TinyPNG or ImageOptim
3. **Use WebP format**: Better compression than JPEG/PNG
4. **Remove metadata**: Strip EXIF data for privacy

### Recommended Dimensions

- **Carousel images**: 1200x800px (3:2 ratio)
- **Thumbnails**: 400x300px
- **Hero images**: 1920x1080px

## API Reference

### List All Images

```typescript
const { data, error } = await supabase
  .storage
  .from('msm_pictures')
  .list('', {
    limit: 100,
    sortBy: { column: 'name', order: 'asc' }
  });
```

### Upload Image

```typescript
const { data, error } = await supabase
  .storage
  .from('msm_pictures')
  .upload('image-name.jpg', file, {
    cacheControl: '3600',
    upsert: false
  });
```

### Delete Image

```typescript
const { data, error } = await supabase
  .storage
  .from('msm_pictures')
  .remove(['image-name.jpg']);
```

## Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs/guides/storage
2. Review the SQL file comments
3. Check browser console for errors
4. Verify Supabase project settings

## Next Steps

1. ✅ Run the SQL setup script
2. ✅ Upload test images
3. ✅ Verify carousel displays images
4. ✅ Set up admin access (optional)
5. ✅ Implement image optimization workflow
6. ✅ Configure backup strategy

---

**Last Updated**: January 2025
**Version**: 1.0
