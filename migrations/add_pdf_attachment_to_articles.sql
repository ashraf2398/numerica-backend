-- Migration: Add PDF attachment support to articles table
-- Date: 2025-01-XX
-- Description: Add pdf_url column to store PDF attachments for articles

-- Add pdf_url column to articles table
ALTER TABLE articles ADD COLUMN IF NOT EXISTS pdf_url TEXT;

-- Add comment to the column
COMMENT ON COLUMN articles.pdf_url IS 'URL to PDF attachment for the article';

-- Optional: Add index for better performance if needed
-- CREATE INDEX IF NOT EXISTS idx_articles_pdf_url ON articles(pdf_url) WHERE pdf_url IS NOT NULL; 