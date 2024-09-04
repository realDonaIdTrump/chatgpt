import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

// Define a route to handle GPT requests
router.post('/chat', chatController.handleChat);

export default router;
