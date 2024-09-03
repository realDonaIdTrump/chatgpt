import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import DialogContentText from '@mui/material/DialogContentText';

function ChangePassword({ open, handleClose, handleChangePassword }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    const success = await handleChangePassword(currentPassword, newPassword);
    if (success) {
      handleClose();
    } else {
      setError('Failed to change password. Please check your current password.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Enter your current password and choose a new password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="current-password"
          name="current-password"
          label="Current Password"
          placeholder="Current Password"
          type="password"
          fullWidth
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <OutlinedInput
          required
          margin="dense"
          id="new-password"
          name="new-password"
          label="New Password"
          placeholder="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <OutlinedInput
          required
          margin="dense"
          id="confirm-password"
          name="confirm-password"
          label="Confirm New Password"
          placeholder="Confirm New Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <DialogContentText color="error">{error}</DialogContentText>}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ChangePassword.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
};

export default ChangePassword;
