import 'mapbox-gl/dist/mapbox-gl.css'; 

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={App} />
    <Toaster richColors position="top-right" />
  </StrictMode>
);
