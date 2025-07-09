import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { RoomsProvider } from './contexts/RoomContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RoomsProvider>
      <App />
    </RoomsProvider>
  </AuthProvider>
);
