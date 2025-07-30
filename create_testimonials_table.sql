CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  company TEXT NOT NULL,
  position TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  display_order INT DEFAULT 0
);

-- Insert sample testimonials
INSERT INTO testimonials (name, content, company, position, display_order)
VALUES 
  ('Sarah Johnson', 'Numérica transformed our financial operations and helped us save thousands in tax liability.', 'TechStart Inc.', 'CEO', 1),
  ('Michael Chen', 'Their financial advisory services gave us the clarity we needed to scale our business effectively.', 'GrowSmart Solutions', 'Founder', 2),
  ('Alicia Martinez', 'The most responsive and thorough accounting team we've ever worked with. Highly recommended!', 'Nexus Enterprises', 'CFO', 3); 