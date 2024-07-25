// Importation des modules nécessaires de React et ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// Importation des fonctions nécessaires pour la gestion des routes depuis react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importation des composants utilisés dans les routes
import App from "./App";
import Menu from "./pages/menuPage";
import Connexion from "./components/connexion/connexion";
import Inscription from "./components/inscription/inscription";
import Continents from "./components/accueil/Accueil";
import Favoris from "./components/favoris/fav";
import Admin from "./components/admin/Admin";

// Création du routeur en utilisant createBrowserRouter avec une configuration de routes
const router = createBrowserRouter([
  {
    // Composant principal qui sera le conteneur pour les routes enfants
    element: <App />,

    // Définition des routes enfants
    children: [
      {
        path: "/",
        element: <Continents />,
      },
      {
        path: "/menuPage/:continent",
        element: <Menu />,
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/favoris",
        element: <Favoris />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },
    ],
  },
]);

// Création de la racine de l'application React dans l'élément avec l'ID "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendu de l'application en mode strict avec le RouterProvider qui utilise le routeur configuré
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
