const express = require('express');
const router = express.Router();
const aboutPublicController = require('../controllers/public/aboutPublicController');
const servicesPublicController = require('../controllers/public/servicesPublicController');
const categoriesPublicController = require('../controllers/public/categoriesPublicController');
const contactsPublicController = require('../controllers/public/contactsPublicController');
const teamPublicController = require('../controllers/public/teamPublicController');
const testimonialsPublicController = require('../controllers/public/testimonialsPublicController');
const trustedCompaniesPublicController = require('../controllers/public/trustedCompaniesPublicController');
const articlesPublicController = require('../controllers/public/articlesPublicController');
const homeBannerPublicController = require('../controllers/public/homeBannerPublicController');
const homeController = require('../controllers/public/homeController');

// Public routes (no authentication required)
router.get('/test', aboutPublicController.testEndpoint);
router.get('/about', aboutPublicController.getPublishedAboutEntries);
router.get('/about/:id', aboutPublicController.getPublishedAboutEntry);

// Categories public routes
router.get('/categories', categoriesPublicController.getAllCategories);
router.get('/categories/:id', categoriesPublicController.getCategoryById);

// Services public routes
router.get('/services', servicesPublicController.getPublishedServices);
router.get('/services/category/:category', servicesPublicController.getPublishedServicesByCategory);
router.get('/services/:id', servicesPublicController.getPublishedServiceById);

// Contact public routes
router.get('/contact', contactsPublicController.getPublishedContact);
router.post('/consultations', contactsPublicController.submitConsultationRequest);

// Team public routes
router.get('/team', teamPublicController.getPublishedTeamMembers);
router.get('/team/:id', teamPublicController.getPublishedTeamMemberById);

// Testimonials public routes
router.get('/testimonials', testimonialsPublicController.getPublishedTestimonials);
router.get('/testimonials/:id', testimonialsPublicController.getTestimonialById);

// Trusted Companies public routes
router.get('/trusted-companies', trustedCompaniesPublicController.getTrustedCompanies);
router.get('/trusted-companies/:id', trustedCompaniesPublicController.getTrustedCompanyById);

// Articles public routes
router.get('/articles', articlesPublicController.getArticles);
router.get('/articles/:id', articlesPublicController.getArticleById);

// Home Banner public routes
router.get('/home-banners', homeBannerPublicController.getHomeBanners);
router.get('/home-banners/:id', homeBannerPublicController.getHomeBannerById);

// Home page content
router.get('/home', homeController.getHomePageContent);

module.exports = router; 