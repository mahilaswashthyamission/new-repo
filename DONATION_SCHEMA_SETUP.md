# Donation Schema Setup Guide

## Overview
This guide explains how to set up and use the Supabase donation tracking system.

## Database Schema

### Donations Table
The `donations` table stores all donation records with the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `donor_name` | TEXT | Full name of the donor |
| `email` | TEXT | Donor's email address |
| `phone` | TEXT | Donor's phone number |
| `amount` | NUMERIC(10,2) | Donation amount in INR |
| `pan` | TEXT | PAN number (optional, for 80G certificate) |
| `transaction_id` | TEXT | Razorpay payment ID (unique) |
| `order_id` | TEXT | Razorpay order ID |
| `payment_status` | TEXT | Status: pending, success, failed, refunded |
| `payment_method` | TEXT | Payment method used (optional) |
| `receipt_sent` | BOOLEAN | Whether receipt email was sent |
| `receipt_url` | TEXT | URL to receipt PDF (optional) |
| `notes` | TEXT | Additional notes (optional) |
| `created_at` | TIMESTAMP | When donation was created |
| `updated_at` | TIMESTAMP | Last update timestamp |

## Setup Instructions

### 1. Run the SQL Schema

Execute the SQL commands in `supabase-schema.sql` in your Supabase SQL Editor:

```bash
# Go to your Supabase project
# Navigate to: SQL Editor > New Query
# Copy and paste the contents of supabase-schema.sql
# Click "Run" to execute
```

### 2. Verify Environment Variables

Make sure these variables are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Test the Setup

After running the schema, you can test by:

1. Making a test donation through your website
2. Checking the Supabase dashboard: Table Editor > donations
3. Verifying the donation appears in the table

## Features

### Row Level Security (RLS)
- **Public Insert**: Anyone can create donations (for the donation form)
- **User Read**: Users can read their own donations by email
- **Service Role**: Full access for backend operations

### Automatic Timestamps
- `created_at`: Set automatically when donation is created
- `updated_at`: Updated automatically on any record change

### Indexes
Optimized queries for:
- Email lookups
- Transaction ID searches
- Order ID searches
- Payment status filtering
- Date-based sorting
- Amount-based sorting

### Donation Statistics View
A pre-built view `donation_stats` provides:
- Total number of donations
- Total amount raised
- Average donation amount
- Highest and lowest donations
- Number of unique donors
- Success/failure counts

Query the stats:
```sql
SELECT * FROM donation_stats;
```

## Usage Examples

### Query All Donations
```sql
SELECT * FROM donations 
ORDER BY created_at DESC;
```

### Query Donations by Email
```sql
SELECT * FROM donations 
WHERE email = 'donor@example.com'
ORDER BY created_at DESC;
```

### Get Total Donations This Month
```sql
SELECT 
  COUNT(*) as count,
  SUM(amount) as total
FROM donations
WHERE created_at >= date_trunc('month', CURRENT_DATE)
  AND payment_status = 'success';
```

### Get Top Donors
```sql
SELECT 
  donor_name,
  email,
  SUM(amount) as total_donated,
  COUNT(*) as donation_count
FROM donations
WHERE payment_status = 'success'
GROUP BY donor_name, email
ORDER BY total_donated DESC
LIMIT 10;
```

### Get Donations by Date Range
```sql
SELECT * FROM donations
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31'
  AND payment_status = 'success'
ORDER BY created_at DESC;
```

## Integration

### How It Works

1. **User Makes Donation**: User fills out the donation form on your website
2. **Payment Processing**: Razorpay processes the payment
3. **Verification**: Server verifies the Razorpay signature
4. **Database Storage**: Donation is saved to both:
   - Supabase (for querying and analytics)
   - Sanity CMS (for content management)
5. **Receipt Generation**: PDF receipt is generated
6. **Email Sent**: Receipt is emailed to donor
7. **Status Update**: `receipt_sent` flag is updated in Supabase

### Data Flow
```
Donation Form → Razorpay → Server Action → Supabase + Sanity → Email Receipt
```

## Monitoring

### Check Recent Donations
Go to Supabase Dashboard:
1. Navigate to: Table Editor > donations
2. Sort by `created_at` descending
3. View recent donations

### Export Data
You can export donation data:
1. Go to Table Editor > donations
2. Click "Export" button
3. Choose CSV or JSON format

## Security

### Best Practices
- ✅ Service role key is used server-side only
- ✅ RLS policies protect user data
- ✅ Transaction IDs are unique (prevents duplicates)
- ✅ Amount validation (must be positive)
- ✅ Payment status is restricted to valid values

### Important Notes
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code
- Always verify Razorpay signatures before saving donations
- Keep transaction IDs unique to prevent duplicate entries

## Troubleshooting

### Donation Not Appearing in Table
1. Check Supabase logs: Logs > Postgres Logs
2. Verify environment variables are set correctly
3. Check if RLS policies are blocking the insert
4. Look for errors in your application logs

### Duplicate Transaction Error
- This means a donation with the same `transaction_id` already exists
- Check if the payment was already processed
- Verify Razorpay webhook isn't creating duplicates

### Receipt Not Sent
- Check the `receipt_sent` field in the donations table
- Verify email service is configured correctly
- Check application logs for email errors

## Future Enhancements

Consider adding:
- Recurring donation tracking
- Donation campaigns/categories
- Donor profiles and history
- Tax receipt generation automation
- Analytics dashboard
- Webhook integration for real-time updates

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Review application logs
- Contact your development team
