-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id bigint primary key generated always as identity,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  social_media JSONB DEFAULT '{}',
  image TEXT,
  email TEXT,
  phone TEXT,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
); 