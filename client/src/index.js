import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { defineCustomElements } from '@esri/calcite-components/dist/loader';
import '@esri/calcite-components/dist/calcite/calcite.css';
// Initialize Calcite Components
defineCustomElements(window, { 
  resourcesUrl: 'https://js.arcgis.com/calcite-components/2.13.2/assets' 
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);