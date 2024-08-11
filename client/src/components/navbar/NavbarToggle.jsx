import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext"; // Importer le contexte utilisateur
import "./NavbarToggle.css"; // Importation des styles CSS pour le composant NavbarToggle

export default function NavbarToggle() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // État pour contrôler l'ouverture/fermeture du menu déroulant
  const { user, setUser } = useUserContext(); // Utilisation du contexte utilisateur pour obtenir et mettre à jour l'utilisateur actuel
  const navigate = useNavigate(); // Hook pour la navigation programmatique
  const notifyFail = () => toast.error("Accès non autorisé, veuillez vous connecter"); // Fonction pour afficher une notification d'échec

  const { logout } = useUserContext(); // Fonction pour se déconnecter, obtenue à partir du contexte utilisateur

  // Fonction pour basculer l'état du menu déroulant
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fonction pour fermer le menu déroulant
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    setUser(""); // Réinitialiser l'utilisateur dans le contexte
    logout(false); // Appeler la fonction de déconnexion
    navigate("/"); // Rediriger vers la page d'accueil après la déconnexion
  };

  // Fonction pour gérer les événements de touche sur les éléments interactifs
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleDropdown(); // Basculer le menu déroulant si la touche "Enter" ou "Espace" est enfoncée
    }
  };

  return (
    <nav className="navbar"> {/* Conteneur principal pour la barre de navigation */}
      <ul className="navbar-nav"> {/* Liste des éléments de la navigation */}
        <li className="nav-item"> {/* Élément de la liste pour l'accueil */}
          <Link className="nav-link active" to="/" onClick={closeDropdown}>
            Accueil
          </Link>
        </li>
        <li className="nav-item dropdown"> {/* Élément de la liste pour le menu déroulant */}
          <div
            className="dropdown-toggle nav-link"
            id="navbar-dropdown"
            role="button"
            onClick={toggleDropdown} // Basculer le menu déroulant au clic
            onKeyDown={handleKeyDown} // Gérer les événements de touche pour le menu déroulant
            tabIndex={0} // Rendre l'élément focalisable
          >
            Menus
          </div>
          <ul
            className={`dropdown-menu ${dropdownOpen ? "show" : ""}`} // Ajouter la classe "show" si le menu déroulant est ouvert
            aria-labelledby="navbar-dropdown"
          >
            {/* Liens pour les différentes catégories de menus */}
            <li>
              <Link
                className="nav-dropdown"
                to="/menuPage/europe"
                onClick={closeDropdown}
              >
                Europe
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`} // Désactiver le lien si l'utilisateur n'est pas connecté
                to={user ? "/menuPage/afrique" : "#"}
                onClick={closeDropdown}
              >
                Afrique
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`} // Désactiver le lien si l'utilisateur n'est pas connecté
                to={user ? "/menuPage/amerique" : "#"}
                onClick={closeDropdown}
              >
                Amérique
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`} // Désactiver le lien si l'utilisateur n'est pas connecté
                to={user ? "/menuPage/asie" : "#"}
                onClick={closeDropdown}
              >
                Asie
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`} // Désactiver le lien si l'utilisateur n'est pas connecté
                to={user ? "/menuPage/oceanie" : "#"}
                onClick={closeDropdown}
              >
                Océanie
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item"> {/* Élément de la liste pour les favoris ou la création */}
          {user && user.role === "admin" ? ( // Afficher le lien de création si l'utilisateur est un administrateur
            <Link
              to="/admin"
              className="nav-link active"
              onClick={closeDropdown}
            >
              Création
            </Link>
          ) : (
            <Link
              to={user ? "/favoris" : "#"} // Désactiver le lien si l'utilisateur n'est pas connecté
              className={`nav-link active ${!user ? "disabled" : ""}`}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault(); // Empêcher la navigation si l'utilisateur n'est pas connecté
                  notifyFail(); // Afficher une notification d'échec
                }
                closeDropdown(); // Fermer le menu déroulant après l'action
              }}
            >
              Favoris
            </Link>
          )}
        </li>
        <li className="nav-item"> {/* Élément de la liste pour la connexion/déconnexion */}
          {user ? (
            <span
              className="nav-link active"
              onClick={handleLogout} // Gérer la déconnexion
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleLogout(); // Gérer les événements de touche pour la déconnexion
              }}
              role="button"
              tabIndex={0} // Rendre l'élément focalisable
            >
              Déconnexion
            </span>
          ) : (
            <Link
              to="/connexion"
              className="nav-link active"
              onClick={closeDropdown}
            >
              Connexion
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
