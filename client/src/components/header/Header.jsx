import "./Header.css"; // Importation des styles CSS pour le composant Header
import logoImage from "../../assets/images/logo-globalmeals.png"; // Importation de l'image du logo

function Header() {
  return (
    <header>
      {/* Conteneur principal du header */}
      <div className="header-container">
        {/* Image du logo avec classe CSS pour le style */}
        <img
          className="header-background" // Classe CSS pour le style de l'image du logo
          src={logoImage} // Source de l'image du logo importée
          alt="Logo_globalmeals" // Texte alternatif pour l'image (accessibilité)
        />
      </div>
    </header>
  );
}

export default Header; // Exportation du composant Header pour qu'il puisse être utilisé dans d'autres parties de l'application
