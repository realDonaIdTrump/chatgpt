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

  return (
    <Box
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '100%',
        backgroundColor: 'rgb(244 244 244)',
        position: 'sticky',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type a message..."
        inputProps={{ 'aria-label': 'chat input' }}
        onChange={handleInputChange}
        value={inputValue}
      />
      <IconButton
        onClick={handleSendClick} // Handle button click
        sx={{
          p: '10px',
          color: inputValue ? 'black' : null,
          '&:hover': {
            color: inputValue ? '#B70032' : null,
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        aria-label="send"
        disabled={!inputValue.trim()}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default InputComponent;
