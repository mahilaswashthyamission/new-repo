# Job Applications Schema Setup Guide

This guide will help you set up the job applications table in Supabase.

## Prerequisites

- Supabase project created
- Access to Supabase SQL Editor

## Setup Steps

### 1. Run the Schema SQL

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the contents of `job-applications-schema.sql`
5. Paste into the SQL Editor
6. Click **Run** to execute

### 2. Verify Table Creation

After running the SQL, verify the table was created:

```sql
SELECT * FROM public.job_applications LIMIT 1;
```

### 3. Set Up Storage Bucket for Resumes

Job applications require file uploads for resumes. Set up a storage bucket:

1. Go to **Storage** in Supabase Dashboard
2. Click **Create a new bucket**
3. Name it: `resumes`
4. Set it as **Public** or **Private** (recommended: Private)
5. Click **Create bucket**

### 4. Set Storage Policies

If you made the bucket private, add these policies:

```sql
-- Policy: Anyone can upload resumes
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'resumes');

-- Policy: Authenticated users can read resumes
CREATE POLICY "Authenticated users can read resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'resumes');

-- Policy: Service role can manage all resumes
CREATE POLICY "Service role can manage resumes"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'resumes');
```

## Table Structure

### job_applications

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| job_slug | TEXT | Job posting slug/identifier |
| job_title | TEXT | Job title for reference |
| applicant_name | TEXT | Full name of applicant |
| email | TEXT | Email address |
| phone | TEXT | Phone number |
| resume_url | TEXT | URL to uploaded resume file |
| cover_message | TEXT | Cover letter/message |
| application_status | TEXT | Status: pending, reviewing, shortlisted, rejected, hired |
| notes | TEXT | Internal notes (optional) |
| reviewed_by | TEXT | Who reviewed the application (optional) |
| reviewed_at | TIMESTAMP | When it was reviewed (optional) |
| created_at | TIMESTAMP | When application was submitted |
| updated_at | TIMESTAMP | Last update timestamp |

## Application Statuses

- **pending**: New application, not yet reviewed
- **reviewing**: Currently being reviewed by HR/hiring team
- **shortlisted**: Candidate selected for interview
- **rejected**: Application rejected
- **hired**: Candidate was hired

## Views Created

### job_application_stats
Provides overall statistics:
- Total applications
- Unique applicants
- Jobs applied to
- Applications by status

### job_applications_by_job
Shows applications grouped by job posting:
- Applications per job
- Status breakdown per job
- Last application date

## Environment Variables

Add to your `.env.local`:

```env
# Already exists
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Usage Example

### Insert a Job Application

```typescript
import { createClient } from '@/lib/supabase';

const supabase = createClient();

const { data, error } = await supabase
  .from('job_applications')
  .insert({
    job_slug: 'software-engineer',
    job_title: 'Software Engineer',
    applicant_name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    resume_url: 'https://your-bucket.supabase.co/storage/v1/object/public/resumes/resume.pdf',
    cover_message: 'I am interested in this position...',
  });
```

### Query Applications

```typescript
// Get all applications for a specific job
const { data, error } = await supabase
  .from('job_applications')
  .select('*')
  .eq('job_slug', 'software-engineer')
  .order('created_at', { ascending: false });

// Get application statistics
const { data: stats } = await supabase
  .from('job_application_stats')
  .select('*')
  .single();
```

## Security Notes

- Row Level Security (RLS) is enabled
- Anyone can submit applications (public form)
- Users can only view their own applications
- Service role has full access for admin dashboard
- Resume files should be stored in private bucket
- Validate file types and sizes on upload

## Next Steps

1. Update the job application form to save to Supabase
2. Create server action for handling file uploads
3. Set up email notifications for new applications
4. Create admin dashboard to review applications
5. Add application tracking for applicants

## Troubleshooting

### Error: relation "public.handle_updated_at" does not exist

Run this first:

```sql
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Error: permission denied for table job_applications

Check your RLS policies are correctly set up and you're using the right API key.
