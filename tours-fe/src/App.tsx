import React from 'react';
import { Route1 } from './routes/Route1';
import { Admin } from './routes/Admin';
import { AuthScreen } from './routes/AuthScreen';
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import { useSelector } from 'react-redux';
import { selectIsUserAuthorised } from './rdx/session/selectors';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './rdx/store';

export function App() {
  const isUserAuthorised = useSelector(selectIsUserAuthorised);
  return (
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="Admin" element={<Admin />} />
          <Route index element={<Route1 />} />
          {isUserAuthorised ? null : <Route path="AuthScreen" element={<AuthScreen />} />}
          <Route path="*" element={isUserAuthorised ? <Admin /> : <AuthScreen />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  );
}
