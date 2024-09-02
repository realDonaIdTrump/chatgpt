// frontend/src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Paper } from '@mui/material';
import ChatInput from './components/ChatInput';
import ChatOutput from './components/ChatOutput';
import './App.css';
import SignInPage from './SignInPage'; // Import the SignInPage component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp'; // Import SignUp component



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
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/chat" element={
          <div>
            <ChatInput />
            <ChatOutput />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
