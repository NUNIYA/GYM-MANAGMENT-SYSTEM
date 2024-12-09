const Package = require('../models/Package');

exports.getHomePage = async (req, res) => {
  res.render('home/index', {
    title: 'AAU Gym Management System',
    user: req.user
  });
};

exports.getAboutPage = (req, res) => {
  res.render('home/about', {
    title: 'About Us',
    user: req.user
  });
};

exports.getPackagesPage = async (req, res) => {
  try {
    const packages = await Package.find();
    res.render('home/packages', {
      title: 'Our Packages',
      packages,
      user: req.user
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading packages');
    res.redirect('/');
  }
};

exports.getContactPage = (req, res) => {
  res.render('home/contact', {
    title: 'Contact Us',
    user: req.user
  });
};

exports.getFaqPage = (req, res) => {
  res.render('home/faq', {
    title: 'FAQ',
    user: req.user
  });
};

exports.getMemberRegistrationPage = (req, res) => {
  res.render('registration/member', {
    title: 'Become a Member',
    user: req.user
  });
};

exports.getTrainerRegistrationPage = (req, res) => {
  res.render('registration/trainer', {
    title: 'Apply as Trainer',
    user: req.user
  });
};