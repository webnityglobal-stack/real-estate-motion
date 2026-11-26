
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import './App.css';

import siteConfig from './config/siteConfig';

document.documentElement.style.setProperty('--brand-primary', siteConfig.theme.primary);
document.documentElement.style.setProperty('--brand-secondary', siteConfig.theme.secondary);
document.documentElement.style.setProperty('--brand-background', siteConfig.theme.background);
document.documentElement.style.setProperty('--brand-text', siteConfig.theme.text);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/real-estate-motion">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
