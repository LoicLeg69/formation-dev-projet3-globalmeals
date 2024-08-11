// Importation du fichier CSS pour styliser le composant
import "./Accueil.css";

// Importation du composant Link depuis react-router-dom pour la navigation interne
import { Link } from "react-router-dom";

// Importation des images représentant les continents et une image de bienvenue
import europeImage from "../../assets/images/i136012-spaghettis-bolognaise.jpeg";
import afriqueImage from "../../assets/images/bonava.jpg";
import ameriqueImage from "../../assets/images/burger.jpeg";
import asieImage from "../../assets/images/assiette-de-sushi.jpeg";
import oceanieImage from "../../assets/images/KANGAROO_STEAK.jpeg";
import welcomeImage from "../../assets/images/friends-happiness.png";

// Importation du contexte utilisateur pour vérifier l'état de connexion
import { useUserContext } from "../../contexts/UserContext";

// Définition du composant fonctionnel Continents
function Continents() {
  // Récupération de l'objet utilisateur depuis le contexte utilisateur
  const { user } = useUserContext();

  // Rendu du composant
  return (
    <main className="continents">
      <div className="welcome-container">
        <img className="welcome" src={welcomeImage} alt="welcome" />
        <h2 className="welcome-text">
          {/* Message de bienvenue personnalisé selon l'état de connexion de l'utilisateur */}
          {user !== ""
            ? "Bienvenue et bonne dégustation !"
            : "Connectez-vous pour découvrir l'ensemble de nos menus !"}
        </h2>
      </div>
      
      <h2 className="new-menus">
        Chaque mois, un tour du monde culinaire avec nos menus complets !
      </h2>
      
      <div className="cercles">
        <div className="continents1">
          <div className="image-container">
            <img className="europe" src={europeImage} alt="europe" />
            <h2>
              {/* Lien vers la page des menus pour l'Europe */}
              <Link to="/menuPage/europe">Europe</Link>
            </h2>
          </div>
          
          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            <img className="afrique" src={afriqueImage} alt="afrique" />
            <h2>
              {/* Lien vers la page des menus pour l'Afrique, désactivé si l'utilisateur n'est pas connecté */}
              <Link to={user !== null ? "/menuPage/afrique" : "#"}>Afrique</Link>
            </h2>
          </div>

          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            <img className="amerique" src={ameriqueImage} alt="amérique" />
            <h2>
              {/* Lien vers la page des menus pour l'Amérique, désactivé si l'utilisateur n'est pas connecté */}
              <Link to={user !== null ? "/menuPage/amerique" : "#"}>Amérique</Link>
            </h2>
          </div>
        </div>

        <div className="continents2">
          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            <img className="asie" src={asieImage} alt="asie" />
            <h2>
              {/* Lien vers la page des menus pour l'Asie, désactivé si l'utilisateur n'est pas connecté */}
              <Link to={user !== null ? "/menuPage/asie" : "#"}>Asie</Link>
            </h2>
          </div>

          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            <img className="oceanie" src={oceanieImage} alt="océanie" />
            <h2>
              {/* Lien vers la page des menus pour l'Océanie, désactivé si l'utilisateur n'est pas connecté */}
              <Link to={user !== null ? "/menuPage/oceanie" : "#"}>Océanie</Link>
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}

// Exportation du composant Continents pour pouvoir l'utiliser ailleurs dans l'application
export default Continents;
