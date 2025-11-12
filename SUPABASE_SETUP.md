# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to https://supabase.com
2. Sign in and create a new project
3. Note your project URL and API keys

## 2. Set Up Database

1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `supabase-schema.sql`
3. Run the SQL to create the members table and policies

## 3. Configure Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Find these values in:
- Supabase Dashboard → Settings → API

## 4. Configure Email Templates (Optional)

1. Go to Authentication → Email Templates
2. Customize the password reset email template
3. Set redirect URL to: `https://your-domain.com/auth/reset-password`

## 5. Enable Email Auth

1. Go to Authentication → Providers
2. Enable Email provider
3. Configure SMTP settings (or use Supabase's default)

## Features Implemented

### Authentication
- ✅ User registration with email
- ✅ Sign in/Sign out
- ✅ Password reset flow
- ✅ Protected dashboard route

### Member Management
- ✅ Member data stored in Supabase
- ✅ Status tracking (pending/approved/rejected)
- ✅ Row Level Security policies
- ✅ User can only access their own data

### Integration
- ✅ Automatic account creation on registration
- ✅ Email notifications
- ✅ Password setup via email link

## New Routes

- `/auth/signin` - Member sign in page
- `/dashboard` - Protected member dashboard
- `/registration` - Registration (now creates Supabase account)

## Database Schema

```sql
members
├── id (UUID, FK to auth.users)
├── email (TEXT, UNIQUE)
├── full_name (TEXT)
├── phone (TEXT)
├── city (TEXT)
├── message (TEXT)
├── status (TEXT: pending/approved/rejected)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## Security

- Row Level Security (RLS) enabled
- Users can only read/update their own data
- Service role has full access for admin operations
- Email confirmation required
- Secure password reset flow

## Next Steps

1. Run `npm install` to install Supabase dependencies
2. Set up your Supabase project
3. Run the SQL schema
4. Add environment variables
5. Test registration and sign in flows
