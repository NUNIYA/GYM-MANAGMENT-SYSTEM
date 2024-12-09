const Trainer = require('../models/Trainer');
const User = require('../models/User');
const { sendTrainerApplicationEmail } = require('../utils/email');

exports.getTrainerRegistrationPage = (req, res) => {
  res.render('registration/trainer', {
    title: 'Apply as Trainer',
    user: req.user
  });
};

exports.registerTrainer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      preferredCampus,
      applicationLetter
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error_msg', 'Email already registered');
      return res.redirect('/register/trainer');
    }

    // Create trainer application
    const trainer = await Trainer.create({
      fullName,
      email,
      phone,
      preferredCampus,
      applicationLetter,
      cv: req.file.filename,
      status: 'pending'
    });

    // Send application confirmation email
    await sendTrainerApplicationEmail(email);

    req.flash('success_msg', 'Application submitted successfully! We will review your application and get back to you soon.');
    res.redirect('/');
  } catch (error) {
    console.error('Trainer registration error:', error);
    req.flash('error_msg', 'Application submission failed. Please try again.');
    res.redirect('/register/trainer');
  }
};