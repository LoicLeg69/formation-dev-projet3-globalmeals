// Importation de l'accès aux tables de la base de données
const tables = require("../../database/tables");

// La méthode Browse (B de BREAD) - Lire toutes les données
const browse = async (req, res, next) => {
  try {
    // Récupérer toutes les recettes de la base de données
    const recipe = await tables.recipe.readAll();

    // Répondre avec les recettes en format JSON
    res.json(recipe);
  } catch (err) {
    // Passer toute erreur au middleware de gestion des erreurs
    next(err);
  }
};

// Méthode pour récupérer les recettes par continent
const recipesByContinent = async (req, res, next) => {
  try {
    // Récupérer les recettes de la base de données en fonction du continent
    const recipe = await tables.recipe.readByContinent(req.query.continent);

    // Répondre avec les recettes en format JSON
    res.json(recipe);
  } catch (err) {
    // Passer toute erreur au middleware de gestion des erreurs
    next(err);
  }
};

// Méthode Edit (E de BREAD) - Modifier une recette existante
const edit = async (req, res, next) => {
  const recipe = req.body;

  try {
    // Mettre à jour la recette dans la base de données
    const updatedRecipe = await tables.recipe.update(recipe);
    
    // Répondre avec un statut 200 (OK) et la recette mise à jour en format JSON
    res.status(200).json({ updatedRecipe });
  } catch (err) {
    // Passer toute erreur au middleware de gestion des erreurs
    next(err);
  }
};

// Méthode Add (A de BREAD) - Ajouter une nouvelle recette
const add = async (req, res, next) => {
  // Extraire les données de la recette du corps de la requête
  const formData = req.body;

  try {
    // Insérer la recette dans la base de données
    const insertId = await tables.recipe.create(formData);

    // Répondre avec un statut HTTP 201 (Créé) et l'ID de la recette nouvellement insérée
    res.status(201).json({ insertId });
  } catch (err) {
    // Passer toute erreur au middleware de gestion des erreurs
    next(err);
  }
};

// Prêt à exporter les fonctions du contrôleur
module.exports = {
  browse,
  add,
  edit,
  recipesByContinent,
};
