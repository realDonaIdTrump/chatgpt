// test/authMiddleware.test.js
const request = require('supertest');
const express = require('express');
const chai = require('chai');
const expect = chai.expect;

const ensureAuthenticated = require('../src/middleware/authMiddleware');

// Setup Express app for testing
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  // Mock the isAuthenticated method for testing
  req.isAuthenticated = () => false; // Default to not authenticated
  next();
});

app.get('/protected', ensureAuthenticated, (req, res) => {
  res.status(200).send('Protected Resource');
});

describe('ensureAuthenticated Middleware', () => {
  it('should return 401 if the user is not authenticated', (done) => {
    request(app)
      .get('/protected')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect({ error: 'Unauthorized' }, done);
  });

  it('should allow access if the user is authenticated', (done) => {
    // Override the mock to simulate an authenticated user
    app.use((req, res, next) => {
      req.isAuthenticated = () => true;
      next();
    });

    request(app)
      .get('/protected')
      .expect(200)
      .expect('Protected Resource', done);
  });
});
