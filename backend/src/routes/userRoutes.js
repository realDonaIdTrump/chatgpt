const express = require('express');
const router = express.Router();
const { createUser, findUserByEmail } = require('../services/userService');
const bcrypt = require('bcrypt'); // Use require instead of import

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

module.exports = router;
