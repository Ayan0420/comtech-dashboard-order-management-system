import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './customBootstrap.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);