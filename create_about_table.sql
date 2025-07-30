CREATE TABLE IF NOT EXISTS about (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mission TEXT,
  vision TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some sample data
INSERT INTO about (title, content, mission, vision, is_published) VALUES
('About Numérica', 'Numérica is a leading financial services company dedicated to providing innovative solutions for businesses and individuals. With years of experience in the financial sector, we help our clients achieve their financial goals through personalized services and expert guidance.', 'Our mission is to empower businesses and individuals with the financial tools and knowledge they need to succeed.', 'To be the most trusted financial partner for businesses and individuals, known for innovation, integrity, and exceptional service.', true),
('Our Mission', 'Our mission is to empower businesses and individuals with the financial tools and knowledge they need to succeed. We believe in building long-term relationships based on trust, transparency, and exceptional service.', 'Empowering financial success through innovative solutions and trusted partnerships.', 'Leading the future of financial services with integrity and excellence.', true); 