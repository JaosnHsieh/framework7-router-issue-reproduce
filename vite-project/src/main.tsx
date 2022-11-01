//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Framework7 from './framework7/framework7.esm.bundle.js';
import Framework7React from 'framework7-react';
import './framework7/css/framework7.bundle.css';

Framework7.use(Framework7React);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
