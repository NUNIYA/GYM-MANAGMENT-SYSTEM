const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendWelcomeEmail = async (email, tempPassword) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to AAU Gym - Your Temporary Credentials',
    html: `
      <h1>Welcome to AAU Gym!</h1>
      <p>Your registration has been received. Here are your temporary login credentials:</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Temporary Password:</strong> ${tempPassword}</p>
      <p>Please login and change your password immediately.</p>
      <p>Best regards,<br>AAU Gym Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

exports.sendTrainerApplicationEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'AAU Gym - Trainer Application Received',
    html: `
      <h1>Thank You for Applying!</h1>
      <p>We have received your application to join AAU Gym as a trainer.</p>
      <p>Our team will review your application and get back to you soon.</p>
      <p>Best regards,<br>AAU Gym Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
};