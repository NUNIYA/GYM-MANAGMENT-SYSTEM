const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, restrictTo } = require('../middleware/auth');

// Protect all admin routes
router.use(protect);
router.use(restrictTo('admin'));

// Dashboard
router.get('/dashboard', adminController.getDashboard);

// Member Management
router.get('/members', adminController.getMembers);
router.post('/members/:id/approve', adminController.approveMember);
router.post('/members/:id/reject', adminController.rejectMember);
router.post('/members/:id/remove', adminController.removeMember);

// Trainer Management
router.get('/trainers', adminController.getTrainers);
router.post('/trainers/:id/approve', adminController.approveTrainer);
router.post('/trainers/:id/reject', adminController.rejectTrainer);
router.post('/trainers/:id/remove', adminController.removeTrainer);

// Complaints Management
router.get('/complaints', adminController.getComplaints);
router.post('/complaints/:id/resolve', adminController.resolveComplaint);

module.exports = router;