import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';

const router = express.Router();

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

export default router;
