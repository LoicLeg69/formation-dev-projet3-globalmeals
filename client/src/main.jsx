// Importation des modules nécessaires de React et ReactDOM
import React from "react"; // Importation de la bibliothèque React pour utiliser ses fonctionnalités
import ReactDOM from "react-dom/client"; // Importation de ReactDOM pour le rendu de l'application

// Importation des fonctions nécessaires pour la gestion des routes depuis react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Fonction pour créer le routeur et composant pour fournir les routes

// Importation des composants utilisés dans les routes
import App from "./App"; // Composant principal de l'application
import Menu from "./pages/menuPage"; // Composant pour afficher les menus basés sur le continent
import Connexion from "./components/connexion/connexion"; // Composant pour la page de connexion
import Inscription from "./components/inscription/inscription"; // Composant pour la page d'inscription
import Continents from "./components/accueil/Accueil"; // Composant pour afficher les continents
import Favoris from "./components/favoris/fav"; // Composant pour afficher les favoris
import Admin from "./components/admin/Admin"; // Composant pour la page d'administration

// Création du routeur en utilisant createBrowserRouter avec une configuration de routes
const router = createBrowserRouter([
  {
    // Composant principal qui sera le conteneur pour les routes enfants
    element: <App />,

    // Définition des routes enfants
    children: [
      {
        path: "/", // Chemin pour la page d'accueil
        element: <Continents />, // Composant à rendre pour ce chemin
      },
      {
        path: "/menuPage/:continent", // Chemin pour afficher les menus selon le continent
        element: <Menu />, // Composant à rendre pour ce chemin
      },
      {
        path: "/connexion", // Chemin pour la page de connexion
        element: <Connexion />, // Composant à rendre pour ce chemin
      },
      {
        path: "/inscription", // Chemin pour la page d'inscription
        element: <Inscription />, // Composant à rendre pour ce chemin
      },
      {
        path: "/favoris", // Chemin pour la page des favoris
        element: <Favoris />, // Composant à rendre pour ce chemin
      },
      {
        path: "/Admin", // Chemin pour la page d'administration
        element: <Admin />, // Composant à rendre pour ce chemin
      },
    ],
  },
]);

// Création de la racine de l'application React dans l'élément avec l'ID "root"
const root = ReactDOM.createRoot(document.getElementById("root")); // Sélection de l'élément racine du DOM pour le rendu

// Rendu de l'application en mode strict avec le RouterProvider qui utilise le routeur configuré
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* Fournit le routeur aux composants */}
  </React.StrictMode>
);
