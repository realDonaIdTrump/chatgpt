// InputComponent.js
import React, { useState } from 'react';
import { Container, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const InputComponent = ({ onChange, inputValue }) => {
  return (
    <Container
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 800,
        backgroundColor: 'rgb(244 244 244)',
        justifyContent: 'flex-end'
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Message PREEvision GPT"
        inputProps={{ 'aria-label': 'search preevision' }}
        onChange={onChange}
        value={inputValue}
      />
      <IconButton
        type="button"
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
        disabled={!inputValue}
      >
        <SendIcon />
      </IconButton>
    </Container>
  );
};

export default InputComponent;
