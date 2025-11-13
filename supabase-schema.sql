-- Create members table
CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can read own member data"
  ON public.members
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own member data"
  ON public.members
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Service role can do everything
CREATE POLICY "Service role can manage all members"
  ON public.members
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.members
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes
CREATE INDEX IF NOT EXISTS members_email_idx ON public.members(email);
CREATE INDEX IF NOT EXISTS members_status_idx ON public.members(status);
CREATE INDEX IF NOT EXISTS members_created_at_idx ON public.members(created_at DESC);

-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  pan TEXT,
  transaction_id TEXT UNIQUE NOT NULL,
  order_id TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'success' CHECK (payment_status IN ('pending', 'success', 'failed', 'refunded')),
  payment_method TEXT,
  receipt_sent BOOLEAN DEFAULT false,
  receipt_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for donations
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert donations (for public donation form)
CREATE POLICY "Anyone can create donations"
  ON public.donations
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can read their own donations by email
CREATE POLICY "Users can read own donations"
  ON public.donations
  FOR SELECT
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Policy: Service role can do everything
CREATE POLICY "Service role can manage all donations"
  ON public.donations
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create updated_at trigger for donations
CREATE TRIGGER set_donations_updated_at
  BEFORE UPDATE ON public.donations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for donations
CREATE INDEX IF NOT EXISTS donations_email_idx ON public.donations(email);
CREATE INDEX IF NOT EXISTS donations_transaction_id_idx ON public.donations(transaction_id);
CREATE INDEX IF NOT EXISTS donations_order_id_idx ON public.donations(order_id);
CREATE INDEX IF NOT EXISTS donations_payment_status_idx ON public.donations(payment_status);
CREATE INDEX IF NOT EXISTS donations_created_at_idx ON public.donations(created_at DESC);
CREATE INDEX IF NOT EXISTS donations_amount_idx ON public.donations(amount DESC);

-- Create a view for donation statistics
CREATE OR REPLACE VIEW public.donation_stats AS
SELECT
  COUNT(*) as total_donations,
  SUM(amount) as total_amount,
  AVG(amount) as average_amount,
  MAX(amount) as highest_donation,
  MIN(amount) as lowest_donation,
  COUNT(DISTINCT email) as unique_donors,
  COUNT(CASE WHEN payment_status = 'success' THEN 1 END) as successful_donations,
  COUNT(CASE WHEN payment_status = 'failed' THEN 1 END) as failed_donations
FROM public.donations;

-- Grant access to the view
GRANT SELECT ON public.donation_stats TO authenticated;
GRANT SELECT ON public.donation_stats TO service_role;
