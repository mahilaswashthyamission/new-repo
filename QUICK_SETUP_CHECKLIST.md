# Quick Setup Checklist for Job Applications

Follow these steps to get job applications working:

## ✅ Step 1: Run the Complete Setup SQL

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `COMPLETE_SETUP.sql`
5. Paste and click **Run**
6. Wait for "Success. No rows returned"

This single SQL file will:
- Create the `job_applications` table
- Set up Row Level Security policies
- Create indexes for performance
- Create statistics views
- Create the `resumes` storage bucket
- Set up storage policies

## ✅ Step 2: Verify Setup

### Check Table
```sql
SELECT * FROM job_applications LIMIT 1;
```
Should return: "No rows" (table exists but empty)

### Check Storage Bucket
1. Go to **Storage** in Supabase Dashboard
2. You should see a bucket named `resumes`

## ✅ Step 3: Test the Form

1. Go to your website
2. Navigate to any job listing
3. Click "Apply Now"
4. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Upload a PDF resume
   - Cover message: Test application
5. Click "Submit Application"
6. You should see "Thank You for Applying!"

## ✅ Step 4: Verify Data

### Check Database
```sql
SELECT * FROM job_applications ORDER BY created_at DESC LIMIT 5;
```
You should see your test application

### Check Storage
1. Go to **Storage** → `resumes` bucket
2. You should see the uploaded PDF file

## 🎉 Success!

If all steps work, your job application system is fully functional!

## 🐛 Troubleshooting

### Error: "Database table not set up"
- Run `COMPLETE_SETUP.sql` again
- Check for any SQL errors in the output

### Error: "Bucket 'resumes' not found"
- The SQL should have created it
- Manually create it: Storage → Create bucket → name: `resumes`

### Error: "Failed to upload resume"
- Check file is PDF format
- Check file size is under 5MB
- Check browser console for detailed error

### Still Having Issues?
Check the server logs:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages starting with "Resume upload error:" or "Database insert error:"
4. Share the error message for help

## 📊 View Applications

### In Supabase Dashboard
1. Go to **Table Editor**
2. Select `job_applications` table
3. View all applications

### Query Statistics
```sql
SELECT * FROM job_application_stats;
```

### Applications by Job
```sql
SELECT * FROM job_applications_by_job;
```

## 🔐 Security Notes

- ✅ Row Level Security is enabled
- ✅ Anyone can submit applications (public form)
- ✅ Users can only view their own applications
- ✅ Resumes are stored in private bucket
- ✅ Only authenticated users can view resumes
- ✅ Service role has full admin access

## Next Steps

1. ✅ Test the application form
2. ✅ Verify data is being saved
3. 📧 Set up email notifications (optional)
4. 📊 Create admin dashboard to review applications (optional)
5. 🔍 Add application search and filtering (optional)
