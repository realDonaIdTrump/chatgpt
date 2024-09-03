const express = require('express');
const router = express.Router();
const { createUser, findUserByEmail } = require('../services/userService');
var bcrypt = require('bcrypt');

// Registration Endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await createUser( email, hashedPassword);
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
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Hash password
    console.log('User found:', user); // Log user details
    console.log(password);
    const isPasswordCorrect = await bcrypt.compareSync(String(password), String(user.PASSWORD).trim());
    console.log('Password match:', isPasswordCorrect); // Log result of password comparison

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


// Export the router
module.exports = router;
