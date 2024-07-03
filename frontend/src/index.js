import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { OfferContextProvider } from './context/OfferContext';
import { AuthContextProvider } from './context/AuthContext';
import { ProSidebarProvider } from 'react-pro-sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProSidebarProvider>
    <AuthContextProvider>
      <OfferContextProvider>
        <App />
      </OfferContextProvider>
    </AuthContextProvider>
    </ProSidebarProvider>
  </React.StrictMode>
);

