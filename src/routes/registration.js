const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const trainerRegistrationController = require('../controllers/trainerRegistrationController');
const upload = require('../middleware/upload');

const memberUploadFields = upload.fields([
  { name: 'studentId', maxCount: 1 },
  { name: 'paymentProof', maxCount: 1 }
]);

const trainerUpload = upload.single('cv');

router.get('/member', registrationController.getMemberRegistrationPage);
router.post('/member', memberUploadFields, registrationController.registerMember);

router.get('/trainer', trainerRegistrationController.getTrainerRegistrationPage);
router.post('/trainer', trainerUpload, trainerRegistrationController.registerTrainer);

module.exports = router;