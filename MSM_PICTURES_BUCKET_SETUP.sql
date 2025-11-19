-- =====================================================
-- MSM Pictures Bucket Setup
-- =====================================================
-- This script sets up the msm_pictures storage bucket
-- with appropriate policies for public read access
-- and authenticated write access
-- =====================================================

-- Create the msm_pictures bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'msm_pictures',
  'msm_pictures',
  true, -- Make bucket public for read access
  10485760, -- 10MB file size limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- Storage Policies
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access for msm_pictures" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to msm_pictures" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their uploads in msm_pictures" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their uploads in msm_pictures" ON storage.objects;

-- Policy 1: Allow public read access to all files in msm_pictures bucket
CREATE POLICY "Public read access for msm_pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'msm_pictures');

-- Policy 2: Allow authenticated users to upload files to msm_pictures bucket
CREATE POLICY "Authenticated users can upload to msm_pictures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'msm_pictures'
);

-- Policy 3: Allow authenticated users to update their own files
CREATE POLICY "Authenticated users can update their uploads in msm_pictures"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'msm_pictures' AND
  auth.uid() = owner
)
WITH CHECK (
  bucket_id = 'msm_pictures' AND
  auth.uid() = owner
);

-- Policy 4: Allow authenticated users to delete their own files
CREATE POLICY "Authenticated users can delete their uploads in msm_pictures"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'msm_pictures' AND
  auth.uid() = owner
);

-- =====================================================
-- Alternative: Admin-only write access
-- =====================================================
-- If you want only admins to upload/modify/delete files,
-- uncomment the following policies and comment out the above ones

/*
-- Drop the authenticated user policies
DROP POLICY IF EXISTS "Authenticated users can upload to msm_pictures" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their uploads in msm_pictures" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their uploads in msm_pictures" ON storage.objects;

-- Create admin-only policies
-- Note: You need to have a custom claim or role system for admins

CREATE POLICY "Admin users can upload to msm_pictures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'msm_pictures' AND
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

CREATE POLICY "Admin users can update files in msm_pictures"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'msm_pictures' AND
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
  bucket_id = 'msm_pictures' AND
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

CREATE POLICY "Admin users can delete files in msm_pictures"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'msm_pictures' AND
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);
*/

-- =====================================================
-- Verification Queries
-- =====================================================
-- Run these queries to verify the setup

-- Check if bucket exists
-- SELECT * FROM storage.buckets WHERE id = 'msm_pictures';

-- Check bucket policies
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%msm_pictures%';

-- List all files in the bucket (as authenticated user)
-- SELECT * FROM storage.objects WHERE bucket_id = 'msm_pictures';

-- =====================================================
-- Usage Notes
-- =====================================================
-- 
-- 1. Public Read Access:
--    - Anyone can view/download images from the bucket
--    - Perfect for displaying images on your public website
--
-- 2. Authenticated Write Access:
--    - Only logged-in users can upload images
--    - Users can only modify/delete their own uploads
--
-- 3. File Size Limit:
--    - Maximum file size is set to 10MB
--    - Adjust the file_size_limit if needed
--
-- 4. Allowed File Types:
--    - Only image files are allowed (jpeg, jpg, png, webp, gif)
--    - Add more MIME types if needed
--
-- 5. Folder Structure (Optional):
--    - You can organize files in folders like:
--      - msm_pictures/programs/
--      - msm_pictures/events/
--      - msm_pictures/team/
--
-- 6. Getting Public URLs:
--    - Use: supabase.storage.from('msm_pictures').getPublicUrl('filename.jpg')
--
-- =====================================================
-- Security Best Practices
-- =====================================================
--
-- 1. Enable RLS (Row Level Security) on storage.objects table
-- 2. Regularly audit uploaded files
-- 3. Implement file scanning for malicious content
-- 4. Set appropriate CORS policies in Supabase dashboard
-- 5. Monitor storage usage and set up alerts
-- 6. Backup important images regularly
--
-- =====================================================
