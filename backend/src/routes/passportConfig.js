const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../services/userService');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/secrets'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.upsertGoogleUser(profile);
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findUserByEmail(id); // Adjust if necessary
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
