// src/middleware/authMiddleware.js
const ensureAuthenticated = (req, res, next) => {
  "use strict";
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
};

module.exports = ensureAuthenticated;
