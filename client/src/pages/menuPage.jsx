import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./menus.css";
import imageTab1 from "../assets/images/description.png";
import imageTab2 from "../assets/images/ingredients.png";
import imageTab3 from "../assets/images/etapes.png";

// URL de l'API stockée dans les variables d'environnement
const ApiUrl = import.meta.env.VITE_API_URL;


//  Fonction pour changer les couleurs du thème en fonction du continent.
//  Utilise des variables CSS pour appliquer les couleurs spécifiques.

const changeColors = (continent) => {
  const root = document.documentElement;
  
  // Applique une couleur différente selon le continent
  switch (continent) {
    case "europe":
      root.style.setProperty("--color-continent", "#0081c8");
      break;
    case "afrique":
      root.style.setProperty("--color-continent", "#242423");
      break;
    case "amerique":
      root.style.setProperty("--color-continent", "#ee334e");
      break;
    case "asie":
      root.style.setProperty("--color-continent", "#e9c46a");
      break;
    case "oceanie":
      root.style.setProperty("--color-continent", "#00a651");
      break;
    default:
      break;
  }
};

function Menu() {
  // Récupère le paramètre de l'URL pour le continent
  const { continent } = useParams();
  const [menuData, setMenuData] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [selectedCountry, setSelectedCountry] = useState([]);

  // Fonction pour récupérer les données du menu en fonction du continent
  const fetchMenuData = async () => {
    try {
      const response = await fetch(
        `${ApiUrl}/recipe/recipesByContinent?continent=${continent}`
      );
      if (!response.ok) {
        throw new Error("The network response was not OK");
      }
      const data = await response.json();

      // Filtre les données pour le continent sélectionné
      const filterData = data.filter(
        (item) => item.continent.toLowerCase() === continent.toLowerCase()
      );

      setMenuData(filterData);
      changeColors(continent);
      setActiveTab("Description");

      // Définit le premier élément de type "starter" comme menu actif
      const starter = filterData.find(
        (item) => item.type.toLowerCase() === "starter"
      );
      setActiveMenu(starter);
    } catch (err) {
      console.error("Menu data recovery failed :", err);
    }
  };

  // Fonction pour récupérer les données des pays en fonction du continent
  const fetchMenu = async () => {
    try {
      const response = await fetch(
        `${ApiUrl}/menu/read?continent=${continent}`
      );
      if (!response.ok) {
        throw new Error("The network response was not OK");
      }
      const data = await response.json();

      // Filtre les données pour le continent sélectionné
      const filterData = data.filter(
        (item) => item.continent.toLowerCase() === continent.toLowerCase()
      );

      setSelectedCountry(filterData);
    } catch (err) {
      console.error("Menu data recovery failed :", err);
    }
  };

  // Utilise useEffect pour récupérer les données lorsque le continent change
  useEffect(() => {
    fetchMenuData();
    fetchMenu();
  }, [continent]);

  // Fonction pour gérer le clic sur un élément du menu
  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
  };

  // Récupère le nom du pays sélectionné
  const country = selectedCountry[0]?.country;

  // Map des types de plats en français
  const typeFrench = {
    starter: "Entrée",
    dish: "Plat",
    dessert: "Dessert",
    cocktail: "Cocktail"
  };

  return (
    <div className="content">
      {/* Vérifie si des données de menu sont disponibles */}
      {menuData.length > 0 ? (
        <>
          {/* Affiche le titre du menu avec le continent sélectionné */}
          <h1 className="menu-title">
            {continent.charAt(0).toUpperCase() +
              continent.slice(1).toLowerCase()}
          </h1>
          {/* Affiche le pays sélectionné ou un message par défaut */}
          <h2>
            Menu{" "}
            {country
              ? country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()
              : "non défini"}
          </h2>
          <div className="menu-container">
            {/* Barre latérale pour les onglets (Description, Ingrédients, Préparation) */}
            <div className={`sidebar ${activeMenu ? "active" : ""}`}>
              {/* Onglet Description */}
              <button
                type="button"
                className={`tab-button ${
                  activeTab === "Description" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Description")}
              >
                <img src={imageTab1} alt="Description" className="tab-icon" />
              </button>
              {/* Onglet Ingrédients */}
              <button
                type="button"
                className={`tab-button ${
                  activeTab === "Ingrédients" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Ingrédients")}
              >
                <img src={imageTab2} alt="Ingrédients" className="tab-icon" />
              </button>
              {/* Onglet Préparation */}
              <button
                type="button"
                className={`tab-button ${
                  activeTab === "Préparation" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Préparation")}
              >
                <img src={imageTab3} alt="Préparation" className="tab-icon" />
              </button>
            </div>
            {/* Section principale pour afficher les sous-sections du menu */}
            <div className="menu-section">
              {/* Map des types de plats et affichage des sous-sections */}
              {["starter", "dish", "dessert", "cocktail"].map((type) => {
                // Trouve le menu correspondant au type
                const menuItem = menuData.find(
                  (item) => item.type.toLowerCase() === type
                );
                return (
                  menuItem !== undefined && (
                    <div
                      key={type}
                      className={`menu-subsection ${
                        activeMenu?.name === menuItem.name ? "selected" : ""
                      }`}
                      onClick={() => handleMenuClick(menuItem)}
                      onKeyDown={(e) => {
                        // Permet d'activer le menu au clavier avec "Enter" ou "Space"
                        if (e.key === "Enter" || e.key === " ") {
                          handleMenuClick(menuItem);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <h3>{typeFrench[type]}</h3>
                      <p>{menuItem.name || "s/o"}</p>
                      <img
                        src={
                          menuItem.image.startsWith("http")
                            ? menuItem.image
                            : `/images/${menuItem.image}`
                        }
                        alt={type}
                        aria-hidden="true"
                      />
                      <p>Temps : {menuItem.step_time || "s/o"}</p>
                    </div>
                  )
                );
              })}
            </div>
          </div>
          {/* Affichage des ingrédients si l'onglet actif est "Ingrédients" */}
          {activeTab === "Ingrédients" && activeMenu !== null && (
            <div className="ingredient-section">
              <h3>{activeMenu.name}</h3>
              <h4>Les ingrédients - 4 personnes</h4>
              <p>{activeMenu.ingredient || "s/o"}</p>
            </div>
          )}
          {/* Affichage de la préparation si l'onglet actif est "Préparation" */}
          {activeTab === "Préparation" && activeMenu !== null && (
            <div className="ingredient-section">
              <h3>{activeMenu.name}</h3>
              <h4>La préparation</h4>
              <p>{activeMenu.step || "s/o"}</p>
            </div>
          )}
        </>
      ) : (
        // Message à afficher si aucune donnée de menu n'est disponible
        <p>Aucun menu disponible pour ce continent.</p>
      )}
    </div>
  );
}

export default Menu;
