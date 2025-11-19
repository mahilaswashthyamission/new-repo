-- =====================================================
-- Fix MSM Pictures Bucket - Public Access
-- =====================================================
-- Run this script to fix the msm_pictures bucket
-- and ensure images are publicly accessible
-- =====================================================

-- Step 1: Update the bucket to be public
UPDATE storage.buckets
SET public = true
WHERE id = 'msm_pictures';

-- Step 2: Drop all existing policies
DROP POLICY IF EXISTS "Public read access for msm_pictures" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to msm_pictures" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their uploads in msm_pictures" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their uploads in msm_pictures" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- Step 3: Create a simple public read policy
CREATE POLICY "Public Access to msm_pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'msm_pictures');

-- Step 4: Allow authenticated users to insert
CREATE POLICY "Authenticated users can upload to msm_pictures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'msm_pictures');

-- Step 5: Allow authenticated users to update
CREATE POLICY "Authenticated users can update in msm_pictures"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'msm_pictures');

-- Step 6: Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete from msm_pictures"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'msm_pictures');

-- =====================================================
-- Verification
-- =====================================================
-- Check bucket is public
SELECT id, name, public FROM storage.buckets WHERE id = 'msm_pictures';

-- Check policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%msm_pictures%';
