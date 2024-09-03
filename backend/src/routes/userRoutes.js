const express = require('express');
const router = express.Router();
const { createUser, findUserByEmail } = require('../services/userService');
const bcrypt = require('bcrypt'); // Use require instead of import
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {savePasswordResetToken, getUserById, updateUserPassword, clearPasswordResetToken } = require('../services/userService');

// Registration Endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    // Create new user (hashing will be done in the service layer)
    const user = await createUser(email, password);
    res.status(201).json({ message: 'User created successfully.', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Log in a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set up session or JWT token here
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle forget password reset link requests
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ error: "User with this email does not exist." });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 3600000).toISOString(); // 1 hour from now

  await savePasswordResetToken(user.id, resetToken, resetTokenExpiry);

  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}&id=${user.id}`;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL,
    subject: 'Password Reset',
    text: `You are receiving this email because you (or someone else) requested a password reset for your account.\n\n` +
          `Please click on the following link, or paste it into your browser to complete the process:\n\n` +
          `${resetUrl}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error sending email." });
    }
    res.status(200).json({ message: 'Password reset link sent to your email.' });
  });
});

// Create a Route for Resetting the Password
router.post('/reset-password', async (req, res) => {
  const { token, id, newPassword } = req.body;

  const user = await getUserById(id);
  if (!user || user.reset_token !== token || new Date(user.reset_token_expiry) < new Date()) {
    return res.status(400).json({ error: "Token is invalid or has expired." });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(user.id, hashedPassword);
  await clearPasswordResetToken(user.id); // Remove the reset token

  res.status(200).json({ message: "Password has been reset successfully." });
});

module.exports = router;
