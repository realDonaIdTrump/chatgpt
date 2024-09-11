import React from 'react';
import { Box, IconButton, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledTextareaAutosize = styled(TextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%; // Full width
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${"#B70032"};
  }

  &:focus {
    border-color: ${"#B70032"};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? "#B70032" : "#F4A8A8"};
  }

  // Firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

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
    if (e.key === 'Enter' && !e.shiftKey && inputValue.trim()) {
      e.preventDefault(); // Prevents the default behavior of adding a new line
      handleSendClick();
    }
  };

  return (
    <Box sx={{p: '5px',mb: 0,}}>
    <Box
      sx={{
        
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgb(244, 244, 244)',
        borderRadius: '8px',
        boxShadow: '0px -1px 5px rgba(0, 0, 0, 0.1)',
        
      }}
    >
      <StyledTextareaAutosize
        minRows={1} // Minimum rows to show
        maxRows={4} // Maximum rows to show before scrolling
        aria-label="message input"
        placeholder="Type your message..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        onClick={handleSendClick}
        sx={{
          p: '10px',
          color: inputValue ? 'black' : 'gray', // Change color if there's input
          '&:hover': {
            color: inputValue ? '#B70032' : 'gray', // Change on hover
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        aria-label="send"
        disabled={!inputValue.trim()} // Disable button if no input
      >
        <SendIcon />
      </IconButton>
    </Box>
          {/* Adding the message below the input box */}
          <Typography
        variant="body2"
        sx={{
          color: 'gray',
          mt: 1, // Add some margin to the top of the text
          fontSize: '0.85rem',
          textAlign: 'center',
        }}
      >
        ChatGPT can make mistakes. Check important info.
      </Typography>
    </Box>
  );
};

export default InputComponent;
