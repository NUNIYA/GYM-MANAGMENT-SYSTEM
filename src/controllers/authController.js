const User = require('../models/User');
const Member = require('../models/Member');
const Trainer = require('../models/Trainer');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      req.flash('error_msg', 'Invalid email or password');
      return res.redirect('/auth/login');
    }

    req.session.userId = user._id;
    
    // Redirect based on role
    switch (user.role) {
      case 'admin':
        res.redirect('/admin/dashboard');
        break;
      case 'member':
        res.redirect('/member/dashboard');
        break;
      case 'trainer':
        res.redirect('/trainer/dashboard');
        break;
      default:
        res.redirect('/');
    }
  } catch (error) {
    req.flash('error_msg', 'Login error occurred');
    res.redirect('/auth/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/auth/login');
  });
};

exports.getLoginPage = (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    error_msg: req.flash('error_msg'),
    success_msg: req.flash('success_msg')
  });
};