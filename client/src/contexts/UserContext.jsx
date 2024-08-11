import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

// Création du contexte utilisateur avec une valeur par défaut
const UserContext = createContext();

export default function UserProvider({ children }) {
  // Récupération de l'URL de l'API à partir des variables d'environnement
  const ApiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // Hook pour la navigation programmatique
  const [user, setUser] = useLocalStorage("user", ""); // Utilisation du hook personnalisé pour stocker l'utilisateur dans le localStorage

  // Fonction pour connecter un utilisateur
  const login = (userData) => {
    setUser(userData); // Met à jour l'état de l'utilisateur dans le localStorage
  };

  // Fonction pour déconnecter un utilisateur
  const logout = async (sessionExpired) => {
    try {
      // Appel à l'API pour se déconnecter
      const response = await fetch(`${ApiUrl}/auth/logout`, {
        credentials: "include", // Envoyer/recevoir le cookie avec chaque requête
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Si la déconnexion est réussie
      if (response.status === 200) {
        setUser(""); // Réinitialiser l'utilisateur dans le localStorage
        navigate(sessionExpired === true ? "/connexion" : "/"); // Rediriger vers la page de connexion ou la page d'accueil
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  // Utilisation de useMemo pour optimiser la performance en mémorisant la valeur du contexte
  const memo = useMemo(
    () => ({ user, setUser, login, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user] // Les valeurs mémorisées seront mises à jour lorsque `user` change
  );

  // Fournir le contexte utilisateur aux composants enfants
  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

// Définition des propTypes pour UserProvider pour s'assurer que `children` est requis et est un nœud React valide
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personnalisé pour accéder au contexte utilisateur
export const useUserContext = () => useContext(UserContext);
