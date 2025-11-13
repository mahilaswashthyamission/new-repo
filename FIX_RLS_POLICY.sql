-- Quick fix for RLS policy issue
-- Run this if you get "row-level security policy" error

-- Option 1: Temporarily disable RLS for testing (RECOMMENDED FOR TESTING)
ALTER TABLE public.job_applications DISABLE ROW LEVEL SECURITY;

-- Option 2: If you want to keep RLS enabled, use this instead:
-- DROP POLICY IF EXISTS "Anyone can create job applications" ON public.job_applications;
-- CREATE POLICY "Allow all inserts"
--   ON public.job_applications
--   FOR INSERT
--   TO public
--   WITH CHECK (true);

-- Verify RLS status
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'job_applications';
