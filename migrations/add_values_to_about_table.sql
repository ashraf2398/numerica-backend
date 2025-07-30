-- Add new fields for "Our Values" section to the about table
ALTER TABLE about ADD COLUMN IF NOT EXISTS values_title TEXT DEFAULT 'Our Core Values & Culture';
ALTER TABLE about ADD COLUMN IF NOT EXISTS values_subtitle TEXT DEFAULT 'The principles that guide our decisions and shape our company culture.';

-- Collaboration value fields
ALTER TABLE about ADD COLUMN IF NOT EXISTS collaboration_title TEXT DEFAULT 'Collaboration';
ALTER TABLE about ADD COLUMN IF NOT EXISTS collaboration_description TEXT DEFAULT 'We believe in the power of teamwork and open communication to deliver exceptional results for our clients.';
ALTER TABLE about ADD COLUMN IF NOT EXISTS collaboration_link TEXT DEFAULT 'Learn more';

-- Integrity value fields
ALTER TABLE about ADD COLUMN IF NOT EXISTS integrity_title TEXT DEFAULT 'Integrity';
ALTER TABLE about ADD COLUMN IF NOT EXISTS integrity_description TEXT DEFAULT 'We operate with honesty, transparency, and the highest ethical standards in everything we do.';
ALTER TABLE about ADD COLUMN IF NOT EXISTS integrity_link TEXT DEFAULT 'Learn more';

-- Innovation value fields
ALTER TABLE about ADD COLUMN IF NOT EXISTS innovation_title TEXT DEFAULT 'Innovation';
ALTER TABLE about ADD COLUMN IF NOT EXISTS innovation_description TEXT DEFAULT 'We embrace change and continuously explore new ideas to deliver cutting-edge solutions.';
ALTER TABLE about ADD COLUMN IF NOT EXISTS innovation_link TEXT DEFAULT 'Learn more';

-- Add image_url field if it doesn't exist
ALTER TABLE about ADD COLUMN IF NOT EXISTS image_url TEXT; 