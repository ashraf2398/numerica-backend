const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const authController = require('../controllers/admin/authController');
const aboutController = require('../controllers/admin/aboutController');
const servicesController = require('../controllers/admin/servicesController');
const categoriesController = require('../controllers/admin/categoriesController');
const contactsController = require('../controllers/admin/contactsController');
const teamController = require('../controllers/admin/teamController');
const testimonialsController = require('../controllers/admin/testimonialsController');
const trustedCompaniesController = require('../controllers/admin/trustedCompaniesController');
const articlesController = require('../controllers/admin/articlesController');
const homeBannerController = require('../controllers/admin/homeBannerController');
const homeController = require('../controllers/admin/homeController');
const dashboardController = require('../controllers/admin/dashboardController');
const { uploadBannerImage, flexibleUpload, handleUploadError } = require('../middleware/uploadMiddleware');
const uploadTrustedCompanyLogo = require('../middleware/uploadTrustedCompany');
const { uploadTeamImage, handleTeamUploadError } = require('../middleware/uploadTeamImage');
const { uploadArticleFiles, handleArticleUploadError } = require('../middleware/uploadArticleFiles');
const { uploadAboutImage, handleAboutUploadError } = require('../middleware/uploadAboutImage');
const { uploadTestimonialImage, handleTestimonialUploadError } = require('../middleware/uploadTestimonialImage');

// Apply JSON parsing only to auth routes that need it
const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });

// Auth routes (with JSON parsing)
router.post('/login', jsonParser, authController.login);
router.post('/register', jsonParser, authController.register);
router.post('/forgot-password', jsonParser, authController.forgotPassword);
router.post('/reset-password', authenticateToken, jsonParser, authController.resetPassword);
router.get('/me', authenticateToken, authController.getMe);

// Dashboard routes (all protected by authentication)
router.get('/dashboard/stats', authenticateToken, dashboardController.getDashboardStats);
router.get('/dashboard/stats/entity', authenticateToken, dashboardController.getEntityStatsByDate);

// Debug route to check token
router.get('/debug-token', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.decode(token);
    res.json({
      token_provided: true,
      decoded: decoded,
      jwt_secret_length: process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error decoding token', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Debug route for about creation
router.post('/debug-about', uploadAboutImage, handleAboutUploadError, (req, res) => {
  console.log('🔍 Debug About Request:');
  console.log('Headers:', req.headers);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body:', req.body);
  console.log('Files:', req.files);
  console.log('File:', req.file);
  
  res.json({
    message: 'Debug data logged',
    body: req.body,
    files: req.files ? req.files.map(f => ({ fieldname: f.fieldname, filename: f.filename })) : 'No files',
    file: req.file ? { fieldname: req.file.fieldname, filename: req.file.filename } : 'No file'
  });
});

// Debug route for testimonial creation
router.post('/debug-testimonial', urlencodedParser, uploadTestimonialImage, handleTestimonialUploadError, (req, res) => {
  console.log('🔍 Debug Testimonial Request:');
  console.log('Headers:', req.headers);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body:', req.body);
  console.log('Files:', req.files);
  console.log('File:', req.file);
  
  res.json({
    message: 'Debug data logged',
    body: req.body,
    files: req.files ? req.files.map(f => ({ fieldname: f.fieldname, filename: f.filename })) : 'No files',
    file: req.file ? { fieldname: req.file.fieldname, filename: req.file.filename } : 'No file'
  });
});

// About routes (all protected by authentication)
router.get('/about', authenticateToken, aboutController.getAllAboutEntries);
router.get('/about/:id', authenticateToken, aboutController.getAboutEntry);
router.post('/about', authenticateToken, uploadAboutImage, handleAboutUploadError, aboutController.createAboutEntry);
router.put('/about/:id', authenticateToken, uploadAboutImage, handleAboutUploadError, aboutController.updateAboutEntry);
router.delete('/about/:id', authenticateToken, aboutController.deleteAboutEntry);

// Categories routes (all protected by authentication)
router.get('/categories', authenticateToken, categoriesController.getAllCategories);
router.get('/categories/:id', authenticateToken, categoriesController.getCategoryById);
router.post('/categories', authenticateToken, categoriesController.createCategory);
router.put('/categories/:id', authenticateToken, categoriesController.updateCategory);
router.delete('/categories/:id', authenticateToken, categoriesController.deleteCategory);

// Services routes (all protected by authentication)
router.get('/services', authenticateToken, servicesController.getAllServices);
router.get('/services/category/:category', authenticateToken, servicesController.getServicesByCategory);
router.get('/services/:id', authenticateToken, servicesController.getServiceById);
router.post('/services', authenticateToken, servicesController.createService);
router.put('/services/:id', authenticateToken, servicesController.updateService);
router.delete('/services/:id', authenticateToken, servicesController.deleteService);

// Contacts routes (all protected by authentication)
router.get('/contacts', authenticateToken, contactsController.getAllContacts);
router.get('/contacts/:id', authenticateToken, contactsController.getContactById);
router.post('/contacts', authenticateToken, contactsController.createContact);
router.put('/contacts/:id', authenticateToken, contactsController.updateContact);
router.delete('/contacts/:id', authenticateToken, contactsController.deleteContact);

// Consultation requests routes (all protected by authentication)
router.get('/consultations', authenticateToken, contactsController.getAllConsultationRequests);
router.get('/consultations/:id', authenticateToken, contactsController.getConsultationRequestById);
router.put('/consultations/:id/status', authenticateToken, contactsController.updateConsultationRequestStatus);
router.delete('/consultations/:id', authenticateToken, contactsController.deleteConsultationRequest);

// Team routes (all protected by authentication)
router.get('/team', authenticateToken, teamController.getAllTeamMembers);
router.post('/team/order', authenticateToken, teamController.updateTeamOrder);
router.get('/team/:id', authenticateToken, teamController.getTeamMemberById);
router.post('/team', authenticateToken, uploadTeamImage, handleTeamUploadError, teamController.createTeamMember);
router.put('/team/:id', authenticateToken, uploadTeamImage, handleTeamUploadError, teamController.updateTeamMember);
router.delete('/team/:id', authenticateToken, teamController.deleteTeamMember);

// Testimonials routes (all protected by authentication)
router.get('/testimonials', authenticateToken, testimonialsController.getAllTestimonials);
router.get('/testimonials/:id', authenticateToken, testimonialsController.getTestimonialById);
router.post('/testimonials', authenticateToken, urlencodedParser, uploadTestimonialImage, handleTestimonialUploadError, testimonialsController.createTestimonial);
router.put('/testimonials/:id', authenticateToken, urlencodedParser, uploadTestimonialImage, handleTestimonialUploadError, testimonialsController.updateTestimonial);
router.delete('/testimonials/:id', authenticateToken, testimonialsController.deleteTestimonial);
router.put('/testimonials/order', authenticateToken, jsonParser, testimonialsController.updateTestimonialOrder);

// Trusted Companies routes (all protected by authentication)
router.get('/trusted-companies', authenticateToken, trustedCompaniesController.getAllTrustedCompanies);
router.get('/trusted-companies/:id', authenticateToken, trustedCompaniesController.getTrustedCompanyById);
router.post('/trusted-companies', authenticateToken, uploadTrustedCompanyLogo, handleUploadError, trustedCompaniesController.createTrustedCompany);
router.put('/trusted-companies/order', authenticateToken, trustedCompaniesController.updateTrustedCompaniesOrder);
router.put('/trusted-companies/:id', authenticateToken, uploadTrustedCompanyLogo, handleUploadError, trustedCompaniesController.updateTrustedCompany);
router.delete('/trusted-companies/:id', authenticateToken, trustedCompaniesController.deleteTrustedCompany);

// Articles routes (all protected by authentication)
router.get('/articles', authenticateToken, articlesController.getAllArticles);
router.get('/articles/search', authenticateToken, articlesController.searchArticles);
router.get('/articles/:id', authenticateToken, articlesController.getArticleById);
router.post('/articles', authenticateToken, uploadArticleFiles, handleArticleUploadError, articlesController.createArticle);
router.put('/articles/:id', authenticateToken, uploadArticleFiles, handleArticleUploadError, articlesController.updateArticle);
router.patch('/articles/:id/toggle-status', authenticateToken, articlesController.toggleArticleStatus);
router.delete('/articles/:id', authenticateToken, articlesController.deleteArticle);

// Home Banner routes (all protected by authentication)
router.get('/home-banners', authenticateToken, homeBannerController.getAllHomeBanners);
router.post('/home-banners', authenticateToken, flexibleUpload, handleUploadError, homeBannerController.createHomeBanner);
router.put('/home-banners/order', authenticateToken, homeBannerController.updateHomeBannersOrder);
router.get('/home-banners/:id', authenticateToken, homeBannerController.getHomeBannerById);
router.put('/home-banners/:id', authenticateToken, flexibleUpload, handleUploadError, homeBannerController.updateHomeBanner);
router.delete('/home-banners/:id', authenticateToken, homeBannerController.deleteHomeBanner);

// Home content routes (all protected by authentication) - Legacy routes for backward compatibility
// Home Banner
router.get('/home/banners', authenticateToken, homeController.getAllHomeBanners);
router.get('/home/banners/:id', authenticateToken, homeController.getHomeBannerById);
router.post('/home/banners', authenticateToken, homeController.createHomeBanner);
router.put('/home/banners/:id', authenticateToken, homeController.updateHomeBanner);
router.delete('/home/banners/:id', authenticateToken, homeController.deleteHomeBanner);

// Testimonials
router.get('/home/testimonials', authenticateToken, homeController.getAllTestimonials);
router.post('/home/testimonials', authenticateToken, homeController.createTestimonial);
router.put('/home/testimonials/:id', authenticateToken, homeController.updateTestimonial);
router.delete('/home/testimonials/:id', authenticateToken, homeController.deleteTestimonial);

// Trusted Companies
router.get('/home/trusted-companies', authenticateToken, homeController.getTrustedCompanies);
router.post('/home/trusted-companies', authenticateToken, homeController.addTrustedCompany);
router.put('/home/trusted-companies/:id', authenticateToken, homeController.updateTrustedCompany);
router.delete('/home/trusted-companies/:id', authenticateToken, homeController.deleteTrustedCompany);

module.exports = router; 