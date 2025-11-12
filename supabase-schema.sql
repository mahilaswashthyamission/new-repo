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
