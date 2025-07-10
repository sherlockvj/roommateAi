import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { RoomsProvider } from './contexts/RoomContext';
import { BrowserRouter, Router } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RoomsProvider>
            <App />
        </RoomsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
