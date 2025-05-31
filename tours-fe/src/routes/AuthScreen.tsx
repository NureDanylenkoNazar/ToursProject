import React, { useCallback, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useAppDispatch } from '../rdx/store';
import { authenticateUser } from '../rdx/session/thunks';
import { useSelector } from 'react-redux';
import { selectIsAuthLoading } from '../rdx/session/selectors';

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useAppDispatch();

  const isLoading = useSelector(selectIsAuthLoading);

  const authUser = useCallback(
    (email: string, password: string) => {
      console.log('HERE WE ARE!!');
      dispatch(authenticateUser(email, password));
    },
    [dispatch]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#121212',
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          mx: 'auto',
          p: 3,
          bgcolor: '#f5f5f5',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          NOVA TRIP
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Button variant={isLogin ? 'contained' : 'outlined'} onClick={() => setIsLogin(true)} sx={{ flex: 1, mr: 1 }}>
            Log In
          </Button>
          <Button
            variant={!isLogin ? 'contained' : 'outlined'}
            onClick={() => setIsLogin(false)}
            sx={{ flex: 1, ml: 1 }}
          >
            Register
          </Button>
        </Box>

        {isLogin ? <LoginForm onSubmit={authUser} isLoading={isLoading} /> : <RegisterForm />}

        <Typography variant="body2" sx={{ mt: 2, color: 'gray' }}>
          NOVA TRIP COMPANY | ALL RIGHTS ARE RESERVED
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthScreen;
