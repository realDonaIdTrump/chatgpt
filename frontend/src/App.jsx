// frontend/src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Paper } from '@mui/material';
import ChatInput from './components/ChatInput';
import ChatOutput from './components/ChatOutput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message });
      setMessages([...messages, { user: message, bot: response.data }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            ChatGPT Application
          </Typography>
          <ChatOutput messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
