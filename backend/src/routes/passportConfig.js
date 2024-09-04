import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { findUserByEmail, getUserById } from '../services/userService.js';

// Configure Passport to use local strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email', // Specify that 'email' should be treated as the username
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
