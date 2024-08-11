import "./App.css"; // Importation du fichier CSS pour les styles globaux de l'application
import { Outlet } from "react-router-dom"; // Composant pour rendre les routes imbriquées
import { ToastContainer } from "react-toastify"; // Composant pour afficher les notifications toast
import UserProvider from "./contexts/UserContext"; // Contexte utilisateur pour gérer l'état utilisateur global
import Header from "./components/header/Header"; // Composant d'en-tête
import NavbarToggle from "./components/navbar/NavbarToggle"; // Composant pour la barre de navigation
import Footer from "./components/Footer/Footer"; // Composant pied de page
import "react-toastify/dist/ReactToastify.css"; // Importation des styles pour les notifications toast

function App() {
  return (
    <UserProvider>
      {/* Le contexte UserProvider entoure l'ensemble de l'application */}
      <div className="app">
        {/* Conteneur principal de l'application */}
        <Header />
        {/* Affiche l'en-tête de l'application */}
        <main className="container">
          {/* Conteneur principal pour le contenu de la page */}
          <NavbarToggle />
          {/* Affiche la barre de navigation */}
          <Outlet />
          {/* Composant pour rendre le contenu des routes imbriquées */}
        </main>
        <ToastContainer
          position="bottom-right" // Position des notifications toast
          autoClose={4000} // Temps d'affichage automatique des notifications (en ms)
          hideProgressBar={false} // Afficher la barre de progression
          newestOnTop // Afficher les nouvelles notifications au-dessus
          closeOnClick // Fermer la notification au clic
          rtl={false} // Langue RTL (false pour LTR), orientation de la lecture du text
          pauseOnFocusLoss // Mettre en pause les notifications lors de la perte de focus
          draggable // Permet de faire glisser les notifications
          pauseOnHover // Mettre en pause les notifications lors du survol
          theme="colored" // Thème des notifications
        />
        {/* Conteneur pour les notifications toast */}
        <Footer />
        {/* Affiche le pied de page */}
      </div>
    </UserProvider>
  );
}

export default App;
