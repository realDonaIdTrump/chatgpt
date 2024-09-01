// frontend/src/components/ChatInput.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ChatInput = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2} display="flex">
      <TextField
        variant="outlined"
        label="Type your message..."
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ ml: 1 }}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
