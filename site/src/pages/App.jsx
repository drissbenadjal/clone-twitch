import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { View } from './View';
import { Notfound } from './Notfound';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<View />} />,
    //recuperer les parametres de l'url et les passer au composant
    <Route path="/:name" element={<View />} />,
    <Route path="*" element={<Notfound />} />,
    <Route path="/notfound" element={<Notfound />} />,
  ])
);

export const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}