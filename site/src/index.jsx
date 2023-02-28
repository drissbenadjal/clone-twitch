import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css';

import { Home } from './pages/Home';
import { Notfound } from './pages/Notfound';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} />,
    //recuperer les parametres de l'url et les passer au composant
    <Route path="/:name" element={<Home />} />,
    <Route path="*" element={<Notfound />} />,
    <Route path="/notfound" element={<Notfound />} />,
  ])
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
