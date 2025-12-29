// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { RouterProvider } from 'react-router-dom'

// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={App}/>
//   </StrictMode>,
// )

import 'mapbox-gl/dist/mapbox-gl.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import { MapProvider } from '@/components/maps/MapProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MapProvider>
      <RouterProvider router={App} />
    </MapProvider>
  </StrictMode>
);
