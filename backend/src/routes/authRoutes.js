const express = require('express');
const router = express.Router();
const User = require('../services/userService');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Start Google OAuth flow
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Handle Google OAuth redirect
router.get('/google/secrets',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile'); // Redirect to a profile or success page
  }
);

module.exports = router;
