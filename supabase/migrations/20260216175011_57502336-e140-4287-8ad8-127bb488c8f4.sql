
-- Public error reports table
CREATE TABLE public.error_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.error_reports ENABLE ROW LEVEL SECURITY;

-- Anyone can read reports (public)
CREATE POLICY "Anyone can read error reports"
  ON public.error_reports FOR SELECT
  USING (true);

-- Anyone can insert error reports (no auth required)
CREATE POLICY "Anyone can submit error reports"
  ON public.error_reports FOR INSERT
  WITH CHECK (true);
