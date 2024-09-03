// src/services/userService.js
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create a new user with email and password
async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email, created_at
  `;
  const values = [email, hashedPassword];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Find a user by email
async function findUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Find a user by Google ID
async function findUserByGoogleId(googleId) {
  const query = 'SELECT * FROM users WHERE google_id = $1';
  const values = [googleId];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Create or update a user from Google OAuth
async function upsertGoogleUser(profile) {
  const { id: googleId, emails } = profile;
  const email = emails[0].value;

  const existingUser = await findUserByGoogleId(googleId);
  if (existingUser) {
    return existingUser;
  }

  const query = `
    INSERT INTO users (email, google_id)
    VALUES ($1, $2)
    RETURNING id, email, created_at
  `;
  const values = [email, googleId];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Update user's password by email
async function updatePasswordByEmail(email, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const query = `
    UPDATE users
    SET password = $1
    WHERE email = $2
    RETURNING id, email, updated_at
  `;
  const values = [hashedPassword, email];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Save a password reset token and expiry date
async function savePasswordResetToken(userId, resetToken, resetTokenExpiry) {
  const query = `
    UPDATE users
    SET reset_token = $1, reset_token_expiry = $2
    WHERE id = $3
    RETURNING id
  `;
  const values = [resetToken, resetTokenExpiry, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Get a user by ID
async function getUserById(id) {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Update user password and clear the reset token
async function updateUserPassword(userId, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const query = `
    UPDATE users
    SET password = $1, reset_token = NULL, reset_token_expiry = NULL
    WHERE id = $2
    RETURNING id, email, updated_at
  `;
  const values = [hashedPassword, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Clear the password reset token
async function clearPasswordResetToken(userId) {
  const query = `
    UPDATE users
    SET reset_token = NULL, reset_token_expiry = NULL
    WHERE id = $1
    RETURNING id
  `;
  const values = [userId];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserByGoogleId,
  upsertGoogleUser,
  updatePasswordByEmail,
  savePasswordResetToken,
  getUserById,
  updateUserPassword,
  clearPasswordResetToken,
};
