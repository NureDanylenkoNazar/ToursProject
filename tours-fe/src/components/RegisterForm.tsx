import React, { useState } from 'react';
import { Box, TextField, Checkbox, FormControlLabel, Button, Link, Typography } from '@mui/material';
import { Person, Phone, Email, Lock } from '@mui/icons-material';

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('HERE IT WAS CALLED');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        margin="normal"
        InputProps={{
          startAdornment: <Person sx={{ mr: 1, color: 'gray' }} />,
        }}
      />
      <TextField
        fullWidth
        label="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        margin="normal"
        InputProps={{
          startAdornment: <Person sx={{ mr: 1, color: 'gray' }} />,
        }}
      />
      <TextField
        fullWidth
        label="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        margin="normal"
        InputProps={{
          startAdornment: <Phone sx={{ mr: 1, color: 'gray' }} />,
        }}
      />
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
      <TextField
        fullWidth
        label="Repeat your password"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
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
        SIGN IN
      </Button>
      <Box sx={{ mt: 2 }}>
        <Link href="#" underline="hover" sx={{ color: 'gray' }}>
          Sign in
        </Link>
      </Box>
    </Box>
  );
};

export default RegisterForm;
