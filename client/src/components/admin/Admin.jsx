import "./Admin.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";

// Fonction pour créer l'état initial du formulaire pour chaque continent
const createInitialFormState = () => ({
  id: "",
  country: "",
  starterId: "",
  starterName: "",
  starterIngredients: "",
  starterSteps: "",
  starterStepTime: "",
  starterImageUrl: "",
  dishId: "",
  dishName: "",
  dishIngredients: "",
  dishSteps: "",
  dishStepTime: "",
  dishImageUrl: "",
  dessertId: "",
  dessertName: "",
  dessertIngredients: "",
  dessertSteps: "",
  dessertStepTime: "",
  dessertImageUrl: "",
  cocktailId: "",
  cocktailName: "",
  cocktailIngredients: "",
  cocktailSteps: "",
  cocktailStepTime: "",
  cocktailImageUrl: "",
});

function Admin() {
  // États pour gérer le continent sélectionné et le formulaire pour chaque continent
  const [selectedContinent, setSelectedContinent] = useState("");
  const [newsForm, setNewsForm] = useState({
    europe: createInitialFormState(),
    afrique: createInitialFormState(),
    amerique: createInitialFormState(),
    asie: createInitialFormState(),
    oceanie: createInitialFormState(),
  });

  // Fonction pour afficher une notification de succès
  const notifySuccess = (text) => toast.success(text);
  // Fonction pour afficher une notification d'échec
  const notifyFail = (text) => toast.error(text);

  // Référence pour le formulaire
  const formRef = useRef(null);
  // Navigation pour rediriger l'utilisateur
  const navigate = useNavigate();

  // Récupération de l'utilisateur à partir du contexte
  const { user } = useUserContext();

  // Redirection si l'utilisateur n'est pas admin
  useEffect(() => {
    if (!(user !== "" && user.role === "admin")) {
      navigate("/");
    }
  }, [user, navigate]);

  // Mappage des continents avec les clés utilisées dans l'état
  const continentMap = {
    1: "europe",
    2: "afrique",
    3: "amerique",
    4: "asie",
    5: "oceanie",
  };

  // Gestionnaire de changement pour sélectionner le continent
  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value);
  };

  // Gestionnaire de changement pour mettre à jour les valeurs du formulaire
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setNewsForm((prevState) => ({
      ...prevState,
      [continentMap[selectedContinent]]: {
        ...prevState[continentMap[selectedContinent]],
        [name]: value,
      },
    }));
  };

  // Ajuste la hauteur des textarea en fonction du contenu
  const adjustTextareaHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ApiUrl = import.meta.env.VITE_API_URL;

    try {
      const continentData = newsForm[continentMap[selectedContinent]];
      const menuId = selectedContinent;

      // Mise à jour des données du menu
      const menuData = {
        id: menuId,
        country: continentData.country,
      };

      const menuResponse = await fetch(`${ApiUrl}/menu`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      });

      if (!menuResponse.ok) {
        throw new Error("Erreur lors de la mise à jour du menu.");
      }

      const recipeTypes = ["starter", "dish", "dessert", "cocktail"];
      const recipePromises = recipeTypes.map(async (type) => {
        const idField = `${type}Id`;
        const nameField = `${type}Name`;
        const ingredientsField = `${type}Ingredients`;
        const stepsField = `${type}Steps`;
        const stepTimeField = `${type}StepTime`;
        const imageUrlField = `${type}ImageUrl`;

        const recipeData = {
          id: continentData[idField],
          menu_id: menuId,
          type,
        };

        // Ajoute seulement les champs qui ne sont pas vides
        if (continentData[nameField]) recipeData.name = continentData[nameField];
        if (continentData[ingredientsField]) recipeData.ingredient = continentData[ingredientsField];
        if (continentData[stepsField]) recipeData.step = continentData[stepsField];
        if (continentData[stepTimeField]) recipeData.step_time = continentData[stepTimeField];
        if (continentData[imageUrlField]) recipeData.image = continentData[imageUrlField];

        return fetch(`${ApiUrl}/recipe`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeData),
        });
      });

      await Promise.all(recipePromises);

      // Notifications et réinitialisation du formulaire après soumission réussie
      notifySuccess("Le formulaire a été validé avec succès !");
      if (formRef.current) {
        formRef.current.reset();
      }
      setSelectedContinent("");
      setNewsForm({
        europe: createInitialFormState(),
        afrique: createInitialFormState(),
        amerique: createInitialFormState(),
        asie: createInitialFormState(),
        oceanie: createInitialFormState(),
      });

      // Redirection vers la page du menu du continent sélectionné
      navigate(`/menuPage/${continentMap[selectedContinent]}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      notifyFail("Erreur lors de la soumission du formulaire.");
    }
  };

  return (
    <div className="create-menu">
      <h1>Modifier votre Menu</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="admin-continent">
          <label htmlFor="continent">
            Continents:
            <select
              id="continent"
              className="select-continent"
              name="continent"
              value={selectedContinent}
              onChange={handleContinentChange}
            >
              <option value="">Sélectionner</option>
              <option value="1">Europe</option>
              <option value="2">Afrique</option>
              <option value="3">Amérique</option>
              <option value="4">Asie</option>
              <option value="5">Océanie</option>
            </select>
          </label>
          <label htmlFor="country">
            Pays:
            <textarea
              id="country"
              name="country"
              placeholder="Nom du Pays"
              value={newsForm[continentMap[selectedContinent]]?.country || ""}
              onChange={handleUpdateChange}
              onInput={adjustTextareaHeight}
            />
          </label>
          <input
            type="hidden"
            name="id"
            value={newsForm[continentMap[selectedContinent]]?.id || ""}
          />
        </div>

        {/* Section pour l'entrée */}
        <div>
          <h2>Entrée</h2>
          <div>
            <input
              type="hidden"
              name="starterId"
              value={newsForm[continentMap[selectedContinent]]?.starterId || ""}
            />
            <label htmlFor="starterName">
              Nom de l'entrée:
              <textarea
                id="starterName"
                name="starterName"
                placeholder="Nom de l'entrée"
                value={
                  newsForm[continentMap[selectedContinent]]?.starterName || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="starterIngredients">
              Ingrédients:
              <textarea
                id="starterIngredients"
                name="starterIngredients"
                placeholder="Ingrédients"
                value={
                  newsForm[continentMap[selectedContinent]]
                    ?.starterIngredients || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="starterSteps">
              Étapes:
              <textarea
                id="starterSteps"
                name="starterSteps"
                placeholder="Étapes"
                value={
                  newsForm[continentMap[selectedContinent]]?.starterSteps || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="starterStepTime">
              Temps des étapes:
              <textarea
                id="starterStepTime"
                name="starterStepTime"
                placeholder="Temps des étapes"
                value={
                  newsForm[continentMap[selectedContinent]]?.starterStepTime ||
                  ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="starterImageUrl">
              Lien de l'image:
              <textarea
                id="starterImageUrl"
                name="starterImageUrl"
                placeholder="Lien de l'image"
                value={
                  newsForm[continentMap[selectedContinent]]?.starterImageUrl ||
                  ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        {/* Section pour le plat principal */}
        <div>
          <h2>Plat Principal</h2>
          <div>
            <input
              type="hidden"
              name="dishId"
              value={newsForm[continentMap[selectedContinent]]?.dishId || ""}
            />
            <label htmlFor="dishName">
              Nom du plat principal:
              <textarea
                id="dishName"
                name="dishName"
                placeholder="Nom du plat principal"
                value={
                  newsForm[continentMap[selectedContinent]]?.dishName || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dishIngredients">
              Ingrédients:
              <textarea
                id="dishIngredients"
                name="dishIngredients"
                placeholder="Ingrédients"
                value={
                  newsForm[continentMap[selectedContinent]]?.dishIngredients ||
                  ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dishSteps">
              Étapes:
              <textarea
                id="dishSteps"
                name="dishSteps"
                placeholder="Étapes"
                value={
                  newsForm[continentMap[selectedContinent]]?.dishSteps || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dishStepTime">
              Temps des étapes:
              <textarea
                id="dishStepTime"
                name="dishStepTime"
                placeholder="Temps des étapes"
                value={
                  newsForm[continentMap[selectedContinent]]?.dishStepTime || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dishImageUrl">
              Lien de l'image:
              <textarea
                id="dishImageUrl"
                name="dishImageUrl"
                placeholder="Lien de l'image"
                value={
                  newsForm[continentMap[selectedContinent]]?.dishImageUrl || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        {/* Section pour le dessert */}
        <div>
          <h2>Dessert</h2>
          <div>
            <input
              type="hidden"
              name="dessertId"
              value={newsForm[continentMap[selectedContinent]]?.dessertId || ""}
            />
            <label htmlFor="dessertName">
              Nom du dessert:
              <textarea
                id="dessertName"
                name="dessertName"
                placeholder="Nom du dessert"
                value={
                  newsForm[continentMap[selectedContinent]]?.dessertName || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dessertIngredients">
              Ingrédients:
              <textarea
                id="dessertIngredients"
                name="dessertIngredients"
                placeholder="Ingrédients"
                value={
                  newsForm[continentMap[selectedContinent]]
                    ?.dessertIngredients || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dessertSteps">
              Étapes:
              <textarea
                id="dessertSteps"
                name="dessertSteps"
                placeholder="Étapes"
                value={
                  newsForm[continentMap[selectedContinent]]?.dessertSteps || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dessertStepTime">
              Temps des étapes:
              <textarea
                id="dessertStepTime"
                name="dessertStepTime"
                placeholder="Temps des étapes"
                value={
                  newsForm[continentMap[selectedContinent]]
                    ?.dessertStepTime || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dessertImageUrl">
              Lien de l'image:
              <textarea
                id="dessertImageUrl"
                name="dessertImageUrl"
                placeholder="Lien de l'image"
                value={
                  newsForm[continentMap[selectedContinent]]
                    ?.dessertImageUrl || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        {/* Section pour le cocktail */}
        <div>
          <h2>Cocktail</h2>
          <div>
            <input
              type="hidden"
              name="cocktailId"
              value={newsForm[continentMap[selectedContinent]]?.cocktailId || ""}
            />
            <label htmlFor="cocktailName">
              Nom du cocktail:
              <textarea
                id="cocktailName"
                name="cocktailName"
                placeholder="Nom du cocktail"
                value={
                  newsForm[continentMap[selectedContinent]]?.cocktailName || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="cocktailIngredients">
              Ingrédients:
              <textarea
                id="cocktailIngredients"
                name="cocktailIngredients"
                placeholder="Ingrédients"
                value={
                  newsForm[continentMap[selectedContinent]]
                    ?.cocktailIngredients || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="cocktailSteps">
              Étapes:
              <textarea
                id="cocktailSteps"
                name="cocktailSteps"
                placeholder="Étapes"
                value={
                  newsForm[continentMap[selectedContinent]]?.cocktailSteps ||
                  ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="cocktailStepTime">
              Temps des étapes:
              <textarea
                id="cocktailStepTime"
                name="cocktailStepTime"
                placeholder="Temps des étapes"
                value={
                  newsForm[continentMap[selectedContinent]]
                    ?.cocktailStepTime || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="cocktailImageUrl">
              Lien de l'image:
              <textarea
                id="cocktailImageUrl"
                name="cocktailImageUrl"
                placeholder="Lien de l'image"
                value={
                  newsForm[continentMap[selectedContinent]]
                    ?.cocktailImageUrl || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        <button type="submit">Valider</button>
      </form>
    </div>
  );
}

export default Admin;
