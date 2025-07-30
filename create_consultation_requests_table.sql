-- Create consultation_requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    preferred_date TIMESTAMP,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_consultation_requests_email ON consultation_requests(email);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON consultation_requests(status);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON consultation_requests(created_at); 