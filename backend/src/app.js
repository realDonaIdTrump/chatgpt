const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const passportConfig = require('./routes/passportConfig'); // Ensure this is imported

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware (required for Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: false, // Typically, this should be false for production
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the ChatGPT App!');
});

module.exports = app;
