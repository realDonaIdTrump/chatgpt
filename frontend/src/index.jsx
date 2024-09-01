// frontend/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Dashboard from './components/Dashboard'; // Adjust path if needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);
