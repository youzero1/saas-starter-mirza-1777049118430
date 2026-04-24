-- Create the parts table
CREATE TABLE IF NOT EXISTS parts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  part_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  car_make TEXT,
  car_model TEXT,
  car_year TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON parts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to SELECT (public catalog)
CREATE POLICY "parts_anon_select" ON parts
  FOR SELECT TO anon USING (true);

-- Allow anonymous users to INSERT, UPDATE, DELETE (no auth required per spec)
CREATE POLICY "parts_anon_insert" ON parts
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "parts_anon_update" ON parts
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "parts_anon_delete" ON parts
  FOR DELETE TO anon USING (true);
