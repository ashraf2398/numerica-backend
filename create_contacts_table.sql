-- Contacts table for company information
CREATE TABLE IF NOT EXISTS contacts (
  id bigint primary key generated always as identity,
  addresses TEXT[] DEFAULT '{}',
  phones TEXT[] DEFAULT '{}',
  emails TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id bigint primary key generated always as identity,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date TIMESTAMP WITH TIME ZONE,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
); 