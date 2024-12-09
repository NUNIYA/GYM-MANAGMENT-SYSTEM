const Member = require('../models/Member');
const User = require('../models/User');
const Package = require('../models/Package');
const { sendWelcomeEmail } = require('../utils/email');
const { generateTempPassword } = require('../utils/auth');

exports.getMemberRegistrationPage = async (req, res) => {
  try {
    const packages = await Package.find();
    res.render('registration/member', {
      title: 'Become a Member',
      packages,
      user: req.user
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading registration page');
    res.redirect('/');
  }
};

exports.registerMember = async (req, res) => {
  try {
    const {
      fullName,
      email,
      age,
      phone,
      isStudent,
      selectedPackage,
      campus
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error_msg', 'Email already registered');
      return res.redirect('/register/member');
    }

    // Create temporary password
    const tempPassword = generateTempPassword();

    // Create user account
    const user = await User.create({
      email,
      password: tempPassword,
      role: 'member',
      campus
    });

    // Create member profile
    const member = await Member.create({
      user: user._id,
      fullName,
      age,
      phone,
      isStudent,
      selectedPackage,
      studentIdPhoto: req.files.studentId ? req.files.studentId[0].filename : null,
      paymentProof: req.files.paymentProof[0].filename
    });

    // Send welcome email with credentials
    await sendWelcomeEmail(email, tempPassword);

    req.flash('success_msg', 'Registration successful! Check your email for login credentials.');
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Registration error:', error);
    req.flash('error_msg', 'Registration failed. Please try again.');
    res.redirect('/register/member');
  }
};