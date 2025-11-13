# Job Applications Integration Complete

The job application form has been integrated with Supabase to store applications.

## What Was Done

### 1. Database Schema Created
- `job-applications-schema.sql` - Complete SQL schema for job applications table
- `JOB_APPLICATIONS_SCHEMA_SETUP.md` - Detailed setup guide

### 2. Server Action Created
- `src/app/actions/job-application.ts` - Handles form submission and file upload

### 3. Form Updated
- `src/app/jobs/[slug]/apply/page.tsx` - Server component that fetches job details
- `src/app/jobs/[slug]/apply/JobApplicationForm.tsx` - Client component with form logic

## Setup Steps

### 1. Run the SQL Schema

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `job-applications-schema.sql`
3. Run the SQL to create the table

### 2. Create Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Create a new bucket named `resumes`
3. Set it as **Private** (recommended)
4. Add storage policies (see JOB_APPLICATIONS_SCHEMA_SETUP.md)

### 3. Verify Environment Variables

Make sure these are in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## How It Works

1. User fills out the job application form
2. Resume PDF is uploaded to Supabase Storage (`resumes` bucket)
3. Application data is saved to `job_applications` table
4. User sees success message
5. Admin can view applications in Supabase dashboard

## Features

- Resume file upload to Supabase Storage
- Form validation
- Error handling with user-friendly messages
- Success confirmation
- All data stored in Supabase
- Row Level Security enabled

## Testing

1. Go to any job listing page
2. Click "Apply Now"
3. Fill out the form with test data
4. Upload a PDF resume
5. Submit the form
6. Check Supabase Dashboard → Table Editor → job_applications

## Viewing Applications

### In Supabase Dashboard

1. Go to Table Editor
2. Select `job_applications` table
3. View all submitted applications

### Query Examples

```sql
-- Get all applications
SELECT * FROM job_applications ORDER BY created_at DESC;

-- Get applications for a specific job
SELECT * FROM job_applications WHERE job_slug = 'software-engineer';

-- Get pending applications
SELECT * FROM job_applications WHERE application_status = 'pending';

-- Get application statistics
SELECT * FROM job_application_stats;
```

## Next Steps

1. Create admin dashboard to review applications
2. Add email notifications for new applications
3. Add application status updates
4. Create applicant tracking system
5. Add resume download functionality

## Troubleshooting

### Error: "Failed to upload resume"
- Check if `resumes` storage bucket exists
- Verify storage policies are set correctly
- Check file size (max 5MB)

### Error: "Failed to submit application"
- Verify SQL schema was run successfully
- Check Supabase connection in `.env.local`
- Check browser console for detailed errors

### TypeScript Error on JobApplicationForm
- Restart your dev server
- Clear Next.js cache: `rm -rf .next`
- The file exists and should work after restart
