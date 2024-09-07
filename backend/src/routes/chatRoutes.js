// chatRoutes.js
import express from 'express';
import { saveMessage, getMessages } from '../services/chatService.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();

// Save chat message
router.post('/save-message', ensureAuthenticated, async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id; // Assuming Passport's user object is available in req

  try {
    await saveMessage(userId, message);
    res.status(200).json({ message: 'Message saved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Get chat history
router.get('/get-messages', ensureAuthenticated, async (req, res) => {
  const userId = req.user.id;

  try {
    const messages = await getMessages(userId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

export default router;
