import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import dotenv from 'dotenv';
import passportConfig from './routes/passportConfig.js'; // Ensure this is imported

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
app.use('/chat', chatRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the ChatGPT App!');
});

export default app;
