CREATE TABLE IF NOT EXISTS home_banner (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a default record
INSERT INTO home_banner (image_url, title, subtitle)
VALUES ('https://example.com/banner.jpg', 'Welcome to Our Services', 'Your success is our priority'); 