-- Sample Data Insertion for Numérica Tax & Accounting Consulting (FIXED VERSION)
-- This script handles GENERATED ALWAYS AS IDENTITY columns properly

-- 1. CATEGORIES TABLE (Remove manual ID insertion)
INSERT INTO categories (name) VALUES
('Tax Services'),
('Accounting Services'),
('Financial Planning'),
('Business Consulting'),
('Audit Services'),
('Payroll Services');

-- 2. ABOUT TABLE (UUID columns can be manually set)
INSERT INTO about (id, title, content, image_url, mission, vision, is_published, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'About Numérica', 
'Numérica is a leading tax and accounting consulting firm with over 15 years of experience serving businesses and individuals across the region. We specialize in providing comprehensive financial solutions that help our clients achieve their goals while ensuring compliance with all regulatory requirements.

Our team of certified professionals includes CPAs, tax specialists, and financial advisors who are committed to delivering exceptional service and personalized solutions. We understand that every client has unique needs, which is why we take a tailored approach to every engagement.

At Numérica, we believe in building long-term relationships based on trust, transparency, and results. Our clients rely on us not just for compliance, but for strategic financial guidance that helps them grow and succeed.',
'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
'To provide exceptional tax and accounting services that empower our clients to make informed financial decisions and achieve their business and personal goals.',
'To be the most trusted financial partner for businesses and individuals, known for our expertise, integrity, and commitment to client success.',
true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440001', 'Our Mission', 
'Our mission is to deliver comprehensive, accurate, and timely financial services that exceed our clients expectations. We are committed to maintaining the highest standards of professional excellence while providing personalized attention to each client.

We strive to be more than just service providers – we aim to be trusted advisors who understand our clients businesses, challenges, and aspirations. Through our expertise and dedication, we help clients navigate complex financial regulations, optimize their tax positions, and make strategic decisions that drive growth and profitability.',
'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800',
'To be the premier choice for tax and accounting services, delivering value through expertise, innovation, and unwavering commitment to client success.',
'To create lasting partnerships that drive financial success and business growth for our clients.',
true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440002', 'Our Vision', 
'We envision a future where every business and individual has access to world-class financial services that enable them to thrive in an increasingly complex financial landscape. Our vision extends beyond traditional accounting and tax services – we see ourselves as strategic partners in our clients success stories.

By leveraging technology, maintaining the highest ethical standards, and continuously expanding our expertise, we aim to set new industry standards for client service and professional excellence.',
'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
'To lead the industry in innovative financial solutions and client service excellence.',
'To transform the way businesses and individuals approach their financial management and planning.',
true, NOW(), NOW());

-- 3. SERVICES TABLE (Remove manual ID insertion)
INSERT INTO services (title, description, category_id, features, icon, is_published, created_at) VALUES
('Tax Preparation & Planning', 
'Comprehensive tax preparation and strategic planning services for individuals and businesses. We ensure maximum tax efficiency while maintaining full compliance with all regulations.',
1, 
ARRAY['Individual Tax Returns', 'Business Tax Returns', 'Tax Planning Strategies', 'Quarterly Tax Estimates', 'Tax Audit Support'],
'tax-preparation-icon',
true, NOW()),

('Business Accounting', 
'Full-service accounting solutions designed to keep your business financially organized and compliant. From bookkeeping to financial reporting, we handle it all.',
2,
ARRAY['Bookkeeping Services', 'Financial Statements', 'General Ledger Maintenance', 'Account Reconciliation', 'Monthly/Quarterly Reports'],
'business-accounting-icon',
true, NOW()),

('Financial Planning & Advisory', 
'Strategic financial planning services to help you achieve your long-term financial goals. We provide personalized advice for wealth building and financial security.',
3,
ARRAY['Retirement Planning', 'Investment Advisory', 'Estate Planning', 'Cash Flow Management', 'Financial Goal Setting'],
'financial-planning-icon',
true, NOW()),

('Business Consulting', 
'Strategic business consulting services to help your company grow and succeed. We provide expert guidance on financial management, operations, and strategic planning.',
4,
ARRAY['Business Strategy', 'Financial Analysis', 'Process Optimization', 'Growth Planning', 'Performance Metrics'],
'business-consulting-icon',
true, NOW()),

('Audit & Assurance', 
'Professional audit and assurance services to provide confidence in your financial statements and internal controls.',
5,
ARRAY['Financial Statement Audits', 'Internal Control Reviews', 'Compliance Audits', 'Due Diligence', 'Risk Assessment'],
'audit-assurance-icon',
true, NOW()),

('Payroll Services', 
'Comprehensive payroll processing and management services to ensure accurate and timely payment of your employees.',
6,
ARRAY['Payroll Processing', 'Tax Filing', 'Direct Deposit Setup', 'Payroll Reports', 'Compliance Management'],
'payroll-services-icon',
true, NOW()),

('Corporate Tax Services', 
'Specialized corporate tax services for businesses of all sizes, ensuring optimal tax positions and full compliance.',
1,
ARRAY['Corporate Tax Returns', 'Tax Strategy', 'Transfer Pricing', 'Tax Credits', 'International Tax'],
'corporate-tax-icon',
true, NOW()),

('Personal Tax Services', 
'Personal tax preparation and planning services for individuals, ensuring you pay only what you owe while maximizing your refunds.',
1,
ARRAY['Personal Tax Returns', 'Tax Planning', 'Deduction Optimization', 'Tax Credits', 'IRS Representation'],
'personal-tax-icon',
true, NOW());

-- 4. TEAM_MEMBERS TABLE (Remove manual ID insertion)
INSERT INTO team_members (name, title, description, social_media, image, email, phone, order_index, is_published, created_at) VALUES
('Ahmed Hassan', 'CEO & Founder', 
'Ahmed has over 20 years of experience in tax and accounting services. He founded Numérica with the vision of providing exceptional financial services that truly serve client needs. Ahmed is a Certified Public Accountant (CPA) and holds a Master degree in Taxation.',
'{"twitter": "https://twitter.com/ahmedhassan", "facebook": "https://facebook.com/ahmedhassan", "linkedin": "https://linkedin.com/in/ahmedhassan"}',
'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
'ahmed@numericatax.com',
'+1 (555) 123-4567',
1, true, NOW()),

('Ashraf Mahmoud', 'Chief Financial Officer', 
'Ashraf brings 15 years of financial leadership experience to Numérica. He specializes in financial planning, risk management, and strategic financial analysis. Ashraf is a CPA and holds an MBA in Finance.',
'{"twitter": "https://twitter.com/ashrafmahmoud", "facebook": "https://facebook.com/ashrafmahmoud", "linkedin": "https://linkedin.com/in/ashrafmahmoud"}',
'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
'ashraf@numericatax.com',
'+1 (555) 123-4568',
2, true, NOW()),

('Nour El-Din', 'Senior Tax Consultant', 
'Nour is a tax specialist with expertise in corporate and individual taxation. She has helped hundreds of clients optimize their tax positions and navigate complex tax regulations. Nour holds a Master degree in Taxation.',
'{"twitter": "https://twitter.com/nourel din", "facebook": "https://facebook.com/nourel din", "linkedin": "https://linkedin.com/in/nourel din"}',
'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
'nour@numericatax.com',
'+1 (555) 123-4569',
3, true, NOW()),

('Sarah Johnson', 'Senior Accountant', 
'Sarah specializes in business accounting and financial reporting. She has extensive experience working with small to medium-sized businesses, helping them maintain accurate financial records and make informed decisions.',
'{"twitter": "https://twitter.com/sarahjohnson", "facebook": "https://facebook.com/sarahjohnson", "linkedin": "https://linkedin.com/in/sarahjohnson"}',
'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
'sarah@numericatax.com',
'+1 (555) 123-4570',
4, true, NOW()),

('Michael Chen', 'Financial Planning Specialist', 
'Michael is a certified financial planner who helps clients achieve their long-term financial goals. He specializes in retirement planning, investment strategies, and estate planning.',
'{"twitter": "https://twitter.com/michaelchen", "facebook": "https://facebook.com/michaelchen", "linkedin": "https://linkedin.com/in/michaelchen"}',
'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
'michael@numericatax.com',
'+1 (555) 123-4571',
5, true, NOW()),

('Lisa Rodriguez', 'Business Consultant', 
'Lisa provides strategic business consulting services, helping companies improve their operations, increase profitability, and achieve sustainable growth. She has worked with businesses across various industries.',
'{"twitter": "https://twitter.com/lisarodriguez", "facebook": "https://facebook.com/lisarodriguez", "linkedin": "https://linkedin.com/in/lisarodriguez"}',
'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
'lisa@numericatax.com',
'+1 (555) 123-4572',
6, true, NOW());

-- 5. CONTACTS TABLE (Remove manual ID insertion)
INSERT INTO contacts (addresses, phones, emails, is_published, created_at) VALUES
(ARRAY['123 Business District, Suite 100, New York, NY 10001', '456 Financial Center, Floor 15, Los Angeles, CA 90001'],
ARRAY['+1 (555) 123-4567', '+1 (555) 987-6543'],
ARRAY['info@numericatax.com', 'support@numericatax.com'],
true, NOW());

-- 6. HOME_BANNER TABLE (Remove manual ID insertion)
INSERT INTO home_banner (image_url, title, subtitle, created_at, updated_at) VALUES
('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200', 
'Professional Tax & Accounting Services', 
'Expert financial solutions for businesses and individuals. Trust our certified professionals to handle your tax and accounting needs.',
NOW(), NOW()),

('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200',
'Strategic Financial Planning', 
'Plan your financial future with confidence. Our comprehensive planning services help you achieve your long-term goals.',
NOW(), NOW()),

('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200',
'Business Consulting Excellence', 
'Transform your business with our strategic consulting services. We help companies grow, optimize, and succeed.',
NOW(), NOW());

-- 7. TESTIMONIALS TABLE (Remove manual ID insertion)
INSERT INTO testimonials (name, content, company, position, avatar_url, created_at, updated_at, display_order) VALUES
('John Smith', 
'Numérica has been handling our company taxes for the past 5 years, and I couldn be happier with their service. They are professional, responsive, and always find ways to save us money while ensuring full compliance.',
'Tech Solutions Inc.',
'CEO',
'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
NOW(), NOW(), 1),

('Maria Garcia', 
'The team at Numérica helped me navigate a complex tax situation during my business expansion. Their expertise and guidance were invaluable, and they made the entire process smooth and stress-free.',
'Garcia Consulting',
'Founder',
'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
NOW(), NOW(), 2),

('David Wilson', 
'As a small business owner, I was struggling with my accounting and tax obligations. Numérica stepped in and completely transformed my financial management. They are truly partners in my success.',
'Wilson Manufacturing',
'Owner',
'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
NOW(), NOW(), 3),

('Jennifer Lee', 
'The financial planning services I received from Numérica were exceptional. They took the time to understand my goals and created a comprehensive plan that gives me confidence in my financial future.',
'Lee & Associates',
'Managing Partner',
'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
NOW(), NOW(), 4),

('Robert Brown', 
'Numérica audit services are top-notch. Their thorough approach and attention to detail gave our board complete confidence in our financial statements. Highly recommended for any business.',
'Brown Enterprises',
'CFO',
'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
NOW(), NOW(), 5);

-- 8. TRUSTED_COMPANIES TABLE (Remove manual ID insertion)
INSERT INTO trusted_companies (logo_url, company_name, display_order, created_at, updated_at) VALUES
('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200', 'Microsoft', 1, NOW(), NOW()),
('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200', 'Google', 2, NOW(), NOW()),
('https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200', 'Apple', 3, NOW(), NOW()),
('https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200', 'Amazon', 4, NOW(), NOW()),
('https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200', 'Meta', 5, NOW(), NOW()),
('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200', 'Netflix', 6, NOW(), NOW());

-- 9. ARTICLES TABLE (UUID columns can be manually set)
INSERT INTO articles (id, title, content, author, featured_image, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440010', 
'Tax Planning Strategies for Small Businesses in 2024',
'Small businesses face unique tax challenges and opportunities. This comprehensive guide covers the latest tax planning strategies that can help small business owners minimize their tax burden while maximizing their growth potential.

Key topics include:
- Section 179 deductions for equipment purchases
- Qualified Business Income (QBI) deduction strategies
- Retirement plan contributions and their tax benefits
- Home office deductions and requirements
- Vehicle and travel expense optimization

Understanding these strategies can save thousands of dollars in taxes while ensuring full compliance with IRS regulations.',
'Ahmed Hassan',
'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
NOW()),

('550e8400-e29b-41d4-a716-446655440011',
'The Importance of Proper Bookkeeping for Business Success',
'Accurate bookkeeping is the foundation of any successful business. This article explores why proper financial record-keeping is crucial for business growth, decision-making, and compliance.

Topics covered:
- The relationship between bookkeeping and business success
- Common bookkeeping mistakes and how to avoid them
- Technology solutions for modern bookkeeping
- When to hire a professional bookkeeper
- Best practices for maintaining accurate records

Proper bookkeeping provides the financial insights needed to make informed business decisions and ensures compliance with tax and regulatory requirements.',
'Sarah Johnson',
'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800',
NOW()),

('550e8400-e29b-41d4-a716-446655440012',
'Retirement Planning: Building a Secure Financial Future',
'Retirement planning is essential for financial security in your golden years. This guide provides practical strategies for building a robust retirement portfolio and ensuring a comfortable lifestyle after work.

Key considerations include:
- Understanding different retirement account types
- Investment strategies for retirement savings
- Social Security optimization
- Healthcare costs in retirement
- Estate planning considerations

Early and consistent retirement planning can make the difference between struggling and thriving in retirement.',
'Michael Chen',
'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
NOW());

-- 10. CONSULTATION_REQUESTS TABLE (Remove manual ID insertion)
INSERT INTO consultation_requests (name, email, phone, preferred_date, message, status, created_at) VALUES
('Alice Johnson', 'alice@example.com', '+1 (555) 111-1111', '2024-06-25 10:00:00', 
'I need help with my small business tax planning for the upcoming year. I have questions about deductions and would like to schedule a consultation.',
'pending', NOW()),

('Bob Wilson', 'bob@example.com', '+1 (555) 222-2222', '2024-06-26 14:00:00',
'Looking for accounting services for my startup. Need help setting up proper bookkeeping and financial reporting systems.',
'confirmed', NOW()),

('Carol Davis', 'carol@example.com', '+1 (555) 333-3333', '2024-06-27 11:00:00',
'Interested in financial planning services for retirement. Would like to discuss investment strategies and retirement account options.',
'pending', NOW()); 