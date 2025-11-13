-- Create job_applications table
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

-- Enable Row Level Security
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert job applications (for public job application form)
CREATE POLICY "Anyone can create job applications"
  ON public.job_applications
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can read their own applications by email
CREATE POLICY "Users can read own job applications"
  ON public.job_applications
  FOR SELECT
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Policy: Service role can do everything
CREATE POLICY "Service role can manage all job applications"
  ON public.job_applications
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create updated_at trigger for job_applications
CREATE TRIGGER set_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for job_applications
CREATE INDEX IF NOT EXISTS job_applications_email_idx ON public.job_applications(email);
CREATE INDEX IF NOT EXISTS job_applications_job_slug_idx ON public.job_applications(job_slug);
CREATE INDEX IF NOT EXISTS job_applications_status_idx ON public.job_applications(application_status);
CREATE INDEX IF NOT EXISTS job_applications_created_at_idx ON public.job_applications(created_at DESC);

-- Create a view for job application statistics
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

-- Grant access to the view
GRANT SELECT ON public.job_application_stats TO authenticated;
GRANT SELECT ON public.job_application_stats TO service_role;

-- Create a view for job applications by job
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

-- Grant access to the view
GRANT SELECT ON public.job_applications_by_job TO authenticated;
GRANT SELECT ON public.job_applications_by_job TO service_role;
