import React, { useState } from 'react';
import { Box, TextField, Checkbox, FormControlLabel, Button, Link, CircularProgress } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';

const LoginForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('CALLED IN THE CORRECT PLACE');
    onSubmit(email, password);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        InputProps={{
          startAdornment: <Email sx={{ mr: 1, color: 'gray' }} />,
        }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        InputProps={{
          startAdornment: <Lock sx={{ mr: 1, color: 'gray' }} />,
        }}
      />
      <FormControlLabel
        control={<Checkbox checked={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.checked)} />}
        label="Keep me signed in"
        sx={{ my: 1 }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ bgcolor: '#f4a261', color: 'white', py: 1.5, mt: 2, '&:hover': { bgcolor: '#e07a5f' } }}
      >
        {isLoading ? <CircularProgress /> : 'LOG IN'}
      </Button>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Link href="#" underline="hover" sx={{ color: 'gray' }}>
          Forgot your password?
        </Link>
        <Link href="#" underline="hover" sx={{ color: 'gray' }}>
          Create account
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
