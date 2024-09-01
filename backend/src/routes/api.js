// backend/src/routes/api.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Define a route to handle GPT requests
router.post('/chat', chatController.handleChat);

module.exports = router;
