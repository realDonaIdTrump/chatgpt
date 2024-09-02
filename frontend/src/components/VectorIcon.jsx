import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import vectorLogo from '../assets/Vector_Logo_black_red_RGB.png'; // Adjust the path if necessary

const Logo = styled('img')({
  width: '100px', // Adjust the size as needed
  height: 'auto',
});

export default function VectorIcon(props) {
  return (
    <Box {...props} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Logo src={vectorLogo} alt="Vector Logo" />
    </Box>
  );
}
