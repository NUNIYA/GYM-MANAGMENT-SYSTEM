const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.getHomePage);
router.get('/about', homeController.getAboutPage);
router.get('/packages', homeController.getPackagesPage);
router.get('/contact', homeController.getContactPage);
router.get('/faq', homeController.getFaqPage);
router.get('/register/member', homeController.getMemberRegistrationPage);
router.get('/register/trainer', homeController.getTrainerRegistrationPage);

module.exports = router;