import bcrypt from 'bcrypt';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER || 'chatgpt_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'chatbot',
  password: process.env.DB_PASSWORD || 'preevision', // Ensure this is a string
  port: process.env.DB_PORT || 5432,
});

// Create a new user with email and password
export async function createUser(email, password) {
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
export async function findUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Find a user by Google ID
export async function findUserByGoogleId(googleId) {
  const query = 'SELECT * FROM users WHERE google_id = $1';
  const values = [googleId];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Create or update a user from Google OAuth
export async function upsertGoogleUser(profile) {
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
export async function updatePasswordByEmail(email, newPassword) {
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
export async function savePasswordResetToken(userId, resetToken, resetTokenExpiry) {
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
export async function getUserById(id) {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Update user password and clear the reset token
export async function updateUserPassword(userId, newPassword) {
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
export async function clearPasswordResetToken(userId) {
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
