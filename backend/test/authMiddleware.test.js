import request from 'supertest';
import express from 'express';
import { expect } from 'chai';

import ensureAuthenticated from '../src/middleware/authMiddleware.js';

// Setup Express app for testing
const createApp = (isAuthenticated) => {
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => {
    // Mock the isAuthenticated method based on test requirements
    req.isAuthenticated = () => isAuthenticated; 
    next();
  });

  app.get('/protected', ensureAuthenticated, (req, res) => {
    res.status(200).send('Protected Resource');
  });

  return app;
};

describe('ensureAuthenticated Middleware', () => {
  it('should return 401 if the user is not authenticated', (done) => {
    const app = createApp(false); // Not authenticated
    request(app)
      .get('/protected')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect({ error: 'Unauthorized' }, done);
  });

  it('should allow access if the user is authenticated', (done) => {
    const app = createApp(true); // Authenticated
    request(app)
      .get('/protected')
      .expect(200)
      .expect('Protected Resource', done);
  });
});
