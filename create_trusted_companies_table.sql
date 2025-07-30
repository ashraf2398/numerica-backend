CREATE TABLE IF NOT EXISTS trusted_companies (
  id SERIAL PRIMARY KEY,
  logo_url TEXT NOT NULL,
  company_name TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample trusted companies
INSERT INTO trusted_companies (logo_url, company_name, display_order)
VALUES 
  ('https://example.com/company1-logo.png', 'Microsoft', 1),
  ('https://example.com/company2-logo.png', 'Amazon', 2),
  ('https://example.com/company3-logo.png', 'Google', 3),
  ('https://example.com/company4-logo.png', 'Apple', 4),
  ('https://example.com/company5-logo.png', 'Tesla', 5); 