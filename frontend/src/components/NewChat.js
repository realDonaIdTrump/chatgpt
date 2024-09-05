import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function NewChat() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<AddIcon />}
      sx={{ margin: "0.5rem 0.2rem", backgroundColor: "#B70032"}}
    >
      New Chat
      <VisuallyHiddenInput
        type="button"
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
  );
}
