const Member = require('../models/Member');
const Trainer = require('../models/Trainer');
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { sendWelcomeEmail } = require('../utils/email');
const { generateTempPassword } = require('../utils/auth');

exports.getDashboard = async (req, res) => {
  try {
    const campus = req.user.campus;
    
    // Get counts for dashboard
    const pendingMembers = await Member.countDocuments({ 
      paymentStatus: 'pending',
      campus: campus 
    });
    const activeMembers = await Member.countDocuments({ 
      membershipStatus: 'active',
      campus: campus 
    });
    const pendingTrainers = await Trainer.countDocuments({ 
      status: 'pending',
      preferredCampus: campus 
    });
    const activeTrainers = await Trainer.countDocuments({ 
      status: 'approved',
      preferredCampus: campus 
    });
    const pendingComplaints = await Complaint.countDocuments({ 
      status: 'pending',
      campus: campus 
    });

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      user: req.user,
      stats: {
        pendingMembers,
        activeMembers,
        pendingTrainers,
        activeTrainers,
        pendingComplaints
      }
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading dashboard');
    res.redirect('/');
  }
};

exports.getMembers = async (req, res) => {
  try {
    const campus = req.user.campus;
    const members = await Member.find({ campus }).populate('user');
    
    res.render('admin/members', {
      title: 'Member Management',
      user: req.user,
      members
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading members');
    res.redirect('/admin/dashboard');
  }
};

exports.approveMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate('user');
    
    if (!member || member.campus !== req.user.campus) {
      req.flash('error_msg', 'Member not found');
      return res.redirect('/admin/members');
    }

    // Generate temporary password and update payment status
    const tempPassword = generateTempPassword();
    await User.findByIdAndUpdate(member.user._id, { password: tempPassword });
    member.paymentStatus = 'approved';
    await member.save();

    // Send welcome email with credentials
    await sendWelcomeEmail(member.user.email, tempPassword);

    req.flash('success_msg', 'Member approved successfully');
    res.redirect('/admin/members');
  } catch (error) {
    req.flash('error_msg', 'Error approving member');
    res.redirect('/admin/members');
  }
};

exports.getTrainers = async (req, res) => {
  try {
    const campus = req.user.campus;
    const trainers = await Trainer.find({ preferredCampus: campus });
    
    res.render('admin/trainers', {
      title: 'Trainer Management',
      user: req.user,
      trainers
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading trainers');
    res.redirect('/admin/dashboard');
  }
};

exports.approveTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    
    if (!trainer || trainer.preferredCampus !== req.user.campus) {
      req.flash('error_msg', 'Trainer not found');
      return res.redirect('/admin/trainers');
    }

    // Create user account with temporary password
    const tempPassword = generateTempPassword();
    const user = await User.create({
      email: trainer.email,
      password: tempPassword,
      role: 'trainer',
      campus: trainer.preferredCampus
    });

    trainer.user = user._id;
    trainer.status = 'approved';
    await trainer.save();

    // Send welcome email with credentials
    await sendWelcomeEmail(trainer.email, tempPassword);

    req.flash('success_msg', 'Trainer approved successfully');
    res.redirect('/admin/trainers');
  } catch (error) {
    req.flash('error_msg', 'Error approving trainer');
    res.redirect('/admin/trainers');
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const campus = req.user.campus;
    const complaints = await Complaint.find({ campus })
      .populate('member')
      .sort({ createdAt: -1 });
    
    res.render('admin/complaints', {
      title: 'Complaints Management',
      user: req.user,
      complaints
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading complaints');
    res.redirect('/admin/dashboard');
  }
};

// Implement other controller methods...