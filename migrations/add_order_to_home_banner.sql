-- Add order column to home_banner table
ALTER TABLE home_banner ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Update existing records with sequential order based on created_at
UPDATE home_banner 
SET display_order = subquery.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as row_num 
  FROM home_banner
) as subquery 
WHERE home_banner.id = subquery.id;

-- Make display_order NOT NULL after setting default values
ALTER TABLE home_banner ALTER COLUMN display_order SET NOT NULL; 