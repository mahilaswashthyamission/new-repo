-- ============================================
-- COMPLETE JOB APPLICATIONS SETUP
-- Run this entire file in Supabase SQL Editor
-- ============================================

-- Step 1: Create the updated_at trigger function (if it doesn't exist)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_slug TEXT NOT NULL,
  job_title TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  cover_message TEXT NOT NULL,
  application_status TEXT NOT NULL DEFAULT 'pending' CHECK (application_status IN ('pending', 'reviewing', 'shortlisted', 'rejected', 'hired')),
  notes TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Enable Row Level Security
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can create job applications" ON public.job_applications;
DROP POLICY IF EXISTS "Users can read own job applications" ON public.job_applications;
DROP POLICY IF EXISTS "Service role can manage all job applications" ON public.job_applications;

-- Step 5: Create policies
CREATE POLICY "Anyone can create job applications"
  ON public.job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own job applications"
  ON public.job_applications
  FOR SELECT
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Service role can manage all job applications"
  ON public.job_applications
  FOR ALL
  USING (auth.role() = 'service_role');

-- Step 6: Create updated_at trigger
DROP TRIGGER IF EXISTS set_job_applications_updated_at ON public.job_applications;
CREATE TRIGGER set_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Step 7: Create indexes
CREATE INDEX IF NOT EXISTS job_applications_email_idx ON public.job_applications(email);
CREATE INDEX IF NOT EXISTS job_applications_job_slug_idx ON public.job_applications(job_slug);
CREATE INDEX IF NOT EXISTS job_applications_status_idx ON public.job_applications(application_status);
CREATE INDEX IF NOT EXISTS job_applications_created_at_idx ON public.job_applications(created_at DESC);

-- Step 8: Create statistics view
CREATE OR REPLACE VIEW public.job_application_stats AS
SELECT
  COUNT(*) as total_applications,
  COUNT(DISTINCT email) as unique_applicants,
  COUNT(DISTINCT job_slug) as jobs_applied_to,
  COUNT(CASE WHEN application_status = 'pending' THEN 1 END) as pending_applications,
  COUNT(CASE WHEN application_status = 'reviewing' THEN 1 END) as reviewing_applications,
  COUNT(CASE WHEN application_status = 'shortlisted' THEN 1 END) as shortlisted_applications,
  COUNT(CASE WHEN application_status = 'rejected' THEN 1 END) as rejected_applications,
  COUNT(CASE WHEN application_status = 'hired' THEN 1 END) as hired_applications
FROM public.job_applications;

-- Step 9: Create applications by job view
CREATE OR REPLACE VIEW public.job_applications_by_job AS
SELECT
  job_slug,
  job_title,
  COUNT(*) as total_applications,
  COUNT(CASE WHEN application_status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN application_status = 'reviewing' THEN 1 END) as reviewing,
  COUNT(CASE WHEN application_status = 'shortlisted' THEN 1 END) as shortlisted,
  COUNT(CASE WHEN application_status = 'rejected' THEN 1 END) as rejected,
  COUNT(CASE WHEN application_status = 'hired' THEN 1 END) as hired,
  MAX(created_at) as last_application_date
FROM public.job_applications
GROUP BY job_slug, job_title
ORDER BY last_application_date DESC;

-- Step 10: Grant access to views
GRANT SELECT ON public.job_application_stats TO authenticated;
GRANT SELECT ON public.job_application_stats TO service_role;
GRANT SELECT ON public.job_applications_by_job TO authenticated;
GRANT SELECT ON public.job_applications_by_job TO service_role;

-- Step 11: Create storage bucket for resumes (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Step 12: Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read resumes" ON storage.objects;
DROP POLICY IF EXISTS "Service role can manage resumes" ON storage.objects;

-- Step 13: Create storage policies
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

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- You can now test the job application form
-- ============================================
