# Setup Resumes Storage Bucket

The job application form requires a storage bucket in Supabase to store resume files.

## Quick Setup Steps

### 1. Create the Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **Storage** in the left sidebar
4. Click **Create a new bucket**
5. Enter bucket name: `resumes`
6. Choose **Private** (recommended for security)
7. Click **Create bucket**

### 2. Set Up Storage Policies

After creating the bucket, you need to add policies to allow uploads:

1. Click on the `resumes` bucket
2. Go to **Policies** tab
3. Click **New Policy**

#### Policy 1: Allow Public Uploads

```sql
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'resumes');
```

#### Policy 2: Allow Authenticated Users to Read

```sql
CREATE POLICY "Authenticated users can read resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'resumes');
```

#### Policy 3: Service Role Full Access

```sql
CREATE POLICY "Service role can manage resumes"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'resumes');
```

### 3. Alternative: Use SQL Editor

You can also create the bucket and policies using SQL:

```sql
-- Create the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false);

-- Add policies
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Authenticated users can read resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'resumes');

CREATE POLICY "Service role can manage resumes"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'resumes');
```

## Verify Setup

After setup, test the upload:

1. Go to your job application form
2. Fill out all fields
3. Upload a PDF resume
4. Submit the form
5. Check Supabase Storage → resumes bucket to see the uploaded file

## Troubleshooting

### Error: "Bucket 'resumes' not found"
- Make sure you created the bucket with exact name: `resumes` (lowercase)
- Refresh your Supabase dashboard

### Error: "new row violates row-level security policy"
- Make sure you added the upload policy
- Check that the policy is enabled

### Error: "Failed to upload resume"
- Check file size (must be under 5MB)
- Ensure file is PDF format
- Check browser console for detailed error

## File Organization

Resumes are organized by job slug:
```
resumes/
  ├── software-engineer/
  │   ├── 1234567890-abc123.pdf
  │   └── 1234567891-def456.pdf
  ├── marketing-manager/
  │   └── 1234567892-ghi789.pdf
  └── ...
```

## Security Notes

- Bucket is set to **Private** by default
- Only authenticated users can view resumes
- Service role has full access for admin operations
- File names are randomized to prevent conflicts
- Original filenames are not preserved for security

## Next Steps

After setting up the bucket:
1. Test the job application form
2. Verify files are being uploaded
3. Check the `job_applications` table for entries
4. Set up admin dashboard to view applications and download resumes
