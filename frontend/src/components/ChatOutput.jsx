// frontend/src/components/ChatOutput.jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ChatOutput = ({ messages }) => {
  return (
    <Box mt={2} mb={2}>
      {messages.map((msg, index) => (
        <Paper key={index} elevation={1} sx={{ padding: 2, mb: 2 }}>
          <Typography variant="body1"><strong>User:</strong> {msg.user}</Typography>
          <Typography variant="body1"><strong>Bot:</strong> {msg.bot}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default ChatOutput;
