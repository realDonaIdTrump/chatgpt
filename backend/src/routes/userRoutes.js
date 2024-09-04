import express from 'express';
import { createUser, findUserByEmail,savePasswordResetToken, updateUserPassword, clearPasswordResetToken } from '../services/userService.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import passport from 'passport';
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    const user = await createUser(email, password);
    res.status(201).json({ message: 'User created successfully.', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Log in a user using Passport
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
});

// Request password reset
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
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Password Reset',
    text: `You are receiving this email because you (or someone else) requested a password reset for your account.\n\n` +
          `Please click on the following link, or paste it into your browser to complete the process:\n\n` +
          `${resetUrl}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send password reset email.' });
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ message: "Password reset link sent via email." });
    }
  });
});

// Add a route to get the logged-in user's info
router.get('/user', ensureAuthenticated, (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(req.user); // Assuming `user` is serialized to only include safe info
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

export default router;
