import React from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const InputComponent = ({ onSendMessage, inputValue, setInputValue }) => {

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  // Handle sending message when "Enter" is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleSendClick();
    }
  };

  return (
    <Box
      sx={{
        p: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Center the input horizontally
        backgroundColor: 'rgb(244, 244, 244)',
        zIndex: 1000,
        borderRadius: '8px', // Add rounded corners
        boxShadow: '0px -1px 5px rgba(0, 0, 0, 0.1)', // Shadow for depth
        mb: 2, // Add a margin bottom to keep input above viewport edge
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }} // Full width of the container
        placeholder="Type a message..."
        inputProps={{ 'aria-label': 'chat input' }}
        onChange={handleInputChange}
        value={inputValue}
        onKeyDown={handleKeyDown} // Handle "Enter" key
      />
      <IconButton
        onClick={handleSendClick}
        sx={{
          p: '10px',
          color: inputValue ? 'black' : null, // Change color if there's input
          '&:hover': {
            color: inputValue ? '#B70032' : null, // Change on hover
            backgroundColor: 'transparent', // No background on hover
            boxShadow: 'none', // No shadow on hover
          },
        }}
        aria-label="send"
        disabled={!inputValue.trim()} // Disable button if no input
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default InputComponent;
