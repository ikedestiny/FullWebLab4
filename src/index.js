import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure you're importing from 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state/store';

// Create a root for the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
