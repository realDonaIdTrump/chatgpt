import axios from 'axios';

const handleChat = async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post('YOUR_PRIVATE_GPT_API_URL', {
      message: userMessage
    }, {
      headers: {
        'Authorization': `Bearer YOUR_API_KEY`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error communicating with Private GPT API:', error);
    res.status(500).json({ error: 'Failed to get response from GPT API' });
  }
};

export { handleChat };
