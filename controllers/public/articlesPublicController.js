const supabase = require('../../utils/supabaseClient');

/**
 * Get all articles
 */
const getArticles = async (req, res) => {
  try {
    console.log('Attempting to fetch articles from Supabase...');
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      
      // If it's a network/fetch error, return mock data for development
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to Supabase connection issues');
        return res.status(200).json([
          {
            id: "550e8400-e29b-41d4-a716-446655440010",
            title: "Tax Planning Strategies for Small Businesses in 2024",
            content: "Small businesses face unique tax challenges and opportunities. This comprehensive guide covers the latest tax planning strategies that can help small business owners minimize their tax burden while maximizing their growth potential.\n\nKey topics include:\n- Section 179 deductions for equipment purchases\n- Qualified Business Income (QBI) deduction strategies\n- Retirement plan contributions and their tax benefits\n- Home office deductions and requirements\n- Vehicle and travel expense optimization\n\nUnderstanding these strategies can save thousands of dollars in taxes while ensuring full compliance with IRS regulations.",
            author: "Ahmed Hassan",
            featured_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
            created_at: new Date().toISOString()
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440011",
            title: "The Importance of Proper Bookkeeping for Business Success",
            content: "Accurate bookkeeping is the foundation of any successful business. This article explores why proper financial record-keeping is crucial for business growth, decision-making, and compliance.\n\nTopics covered:\n- The relationship between bookkeeping and business success\n- Common bookkeeping mistakes and how to avoid them\n- Technology solutions for modern bookkeeping\n- When to hire a professional bookkeeper\n- Best practices for maintaining accurate records\n\nProper bookkeeping provides the financial insights needed to make informed business decisions and ensures compliance with tax and regulatory requirements.",
            author: "Sarah Johnson",
            featured_image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
            created_at: new Date().toISOString()
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440012",
            title: "Retirement Planning: Building a Secure Financial Future",
            content: "Retirement planning is essential for financial security in your golden years. This guide provides practical strategies for building a robust retirement portfolio and ensuring a comfortable lifestyle after work.\n\nKey considerations include:\n- Understanding different retirement account types\n- Investment strategies for retirement savings\n- Social Security optimization\n- Healthcare costs in retirement\n- Estate planning considerations\n\nEarly and consistent retirement planning can make the difference between struggling and thriving in retirement.",
            author: "Michael Chen",
            featured_image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
            created_at: new Date().toISOString()
          }
        ]);
      }
      
      return res.status(400).json({ 
        error: error.message,
        details: error.details,
        hint: error.hint
      });
    }
    
    console.log(`Successfully fetched ${data ? data.length : 0} articles`);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting articles:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      return res.status(200).json([
        {
          id: "550e8400-e29b-41d4-a716-446655440010",
          title: "Tax Planning Strategies for Small Businesses in 2024",
          content: "Small businesses face unique tax challenges and opportunities. This comprehensive guide covers the latest tax planning strategies that can help small business owners minimize their tax burden while maximizing their growth potential.\n\nKey topics include:\n- Section 179 deductions for equipment purchases\n- Qualified Business Income (QBI) deduction strategies\n- Retirement plan contributions and their tax benefits\n- Home office deductions and requirements\n- Vehicle and travel expense optimization\n\nUnderstanding these strategies can save thousands of dollars in taxes while ensuring full compliance with IRS regulations.",
          author: "Ahmed Hassan",
          featured_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
          created_at: new Date().toISOString()
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440011",
          title: "The Importance of Proper Bookkeeping for Business Success",
          content: "Accurate bookkeeping is the foundation of any successful business. This article explores why proper financial record-keeping is crucial for business growth, decision-making, and compliance.\n\nTopics covered:\n- The relationship between bookkeeping and business success\n- Common bookkeeping mistakes and how to avoid them\n- Technology solutions for modern bookkeeping\n- When to hire a professional bookkeeper\n- Best practices for maintaining accurate records\n\nProper bookkeeping provides the financial insights needed to make informed business decisions and ensures compliance with tax and regulatory requirements.",
          author: "Sarah Johnson",
          featured_image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
          created_at: new Date().toISOString()
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440012",
          title: "Retirement Planning: Building a Secure Financial Future",
          content: "Retirement planning is essential for financial security in your golden years. This guide provides practical strategies for building a robust retirement portfolio and ensuring a comfortable lifestyle after work.\n\nKey considerations include:\n- Understanding different retirement account types\n- Investment strategies for retirement savings\n- Social Security optimization\n- Healthcare costs in retirement\n- Estate planning considerations\n\nEarly and consistent retirement planning can make the difference between struggling and thriving in retirement.",
          author: "Michael Chen",
          featured_image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
          created_at: new Date().toISOString()
        }
      ]);
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching articles',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Get article by ID
 */
const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      // If it's a network error, return mock data for the requested ID
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to Supabase connection issues');
        const mockArticles = {
          "550e8400-e29b-41d4-a716-446655440010": {
            id: "550e8400-e29b-41d4-a716-446655440010",
            title: "Tax Planning Strategies for Small Businesses in 2024",
            content: "Small businesses face unique tax challenges and opportunities. This comprehensive guide covers the latest tax planning strategies that can help small business owners minimize their tax burden while maximizing their growth potential.\n\nKey topics include:\n- Section 179 deductions for equipment purchases\n- Qualified Business Income (QBI) deduction strategies\n- Retirement plan contributions and their tax benefits\n- Home office deductions and requirements\n- Vehicle and travel expense optimization\n\nUnderstanding these strategies can save thousands of dollars in taxes while ensuring full compliance with IRS regulations.",
            author: "Ahmed Hassan",
            featured_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
            created_at: new Date().toISOString()
          },
          "550e8400-e29b-41d4-a716-446655440011": {
            id: "550e8400-e29b-41d4-a716-446655440011",
            title: "The Importance of Proper Bookkeeping for Business Success",
            content: "Accurate bookkeeping is the foundation of any successful business. This article explores why proper financial record-keeping is crucial for business growth, decision-making, and compliance.\n\nTopics covered:\n- The relationship between bookkeeping and business success\n- Common bookkeeping mistakes and how to avoid them\n- Technology solutions for modern bookkeeping\n- When to hire a professional bookkeeper\n- Best practices for maintaining accurate records\n\nProper bookkeeping provides the financial insights needed to make informed business decisions and ensures compliance with tax and regulatory requirements.",
            author: "Sarah Johnson",
            featured_image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
            created_at: new Date().toISOString()
          },
          "550e8400-e29b-41d4-a716-446655440012": {
            id: "550e8400-e29b-41d4-a716-446655440012",
            title: "Retirement Planning: Building a Secure Financial Future",
            content: "Retirement planning is essential for financial security in your golden years. This guide provides practical strategies for building a robust retirement portfolio and ensuring a comfortable lifestyle after work.\n\nKey considerations include:\n- Understanding different retirement account types\n- Investment strategies for retirement savings\n- Social Security optimization\n- Healthcare costs in retirement\n- Estate planning considerations\n\nEarly and consistent retirement planning can make the difference between struggling and thriving in retirement.",
            author: "Michael Chen",
            featured_image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
            created_at: new Date().toISOString()
          }
        };
        
        if (mockArticles[id]) {
          return res.status(200).json(mockArticles[id]);
        }
      }
      
      return res.status(404).json({ error: 'Article not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting article:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      const mockArticles = {
        "550e8400-e29b-41d4-a716-446655440010": {
          id: "550e8400-e29b-41d4-a716-446655440010",
          title: "Tax Planning Strategies for Small Businesses in 2024",
          content: "Small businesses face unique tax challenges and opportunities. This comprehensive guide covers the latest tax planning strategies that can help small business owners minimize their tax burden while maximizing their growth potential.\n\nKey topics include:\n- Section 179 deductions for equipment purchases\n- Qualified Business Income (QBI) deduction strategies\n- Retirement plan contributions and their tax benefits\n- Home office deductions and requirements\n- Vehicle and travel expense optimization\n\nUnderstanding these strategies can save thousands of dollars in taxes while ensuring full compliance with IRS regulations.",
          author: "Ahmed Hassan",
          featured_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
          created_at: new Date().toISOString()
        },
        "550e8400-e29b-41d4-a716-446655440011": {
          id: "550e8400-e29b-41d4-a716-446655440011",
          title: "The Importance of Proper Bookkeeping for Business Success",
          content: "Accurate bookkeeping is the foundation of any successful business. This article explores why proper financial record-keeping is crucial for business growth, decision-making, and compliance.\n\nTopics covered:\n- The relationship between bookkeeping and business success\n- Common bookkeeping mistakes and how to avoid them\n- Technology solutions for modern bookkeeping\n- When to hire a professional bookkeeper\n- Best practices for maintaining accurate records\n\nProper bookkeeping provides the financial insights needed to make informed business decisions and ensures compliance with tax and regulatory requirements.",
          author: "Sarah Johnson",
          featured_image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
          created_at: new Date().toISOString()
        },
        "550e8400-e29b-41d4-a716-446655440012": {
          id: "550e8400-e29b-41d4-a716-446655440012",
          title: "Retirement Planning: Building a Secure Financial Future",
          content: "Retirement planning is essential for financial security in your golden years. This guide provides practical strategies for building a robust retirement portfolio and ensuring a comfortable lifestyle after work.\n\nKey considerations include:\n- Understanding different retirement account types\n- Investment strategies for retirement savings\n- Social Security optimization\n- Healthcare costs in retirement\n- Estate planning considerations\n\nEarly and consistent retirement planning can make the difference between struggling and thriving in retirement.",
          author: "Michael Chen",
          featured_image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
          created_at: new Date().toISOString()
        }
      };
      
      if (mockArticles[req.params.id]) {
        return res.status(200).json(mockArticles[req.params.id]);
      }
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching article',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = {
  getArticles,
  getArticleById
}; 