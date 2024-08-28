// Importation du module 'tables' à partir du chemin relatif
const tables = require("../../database/tables");

// Fonction pour gérer la soumission du formulaire
const handleFormSubmission = async (req, res, next) => {
  // Extraire les données du formulaire du corps de la requête
  const formData = req.body;

  try {
    // Insérer les données du formulaire dans la base de données
    const insertId = await tables.admin.create(formData);

    // Répondre avec un statut HTTP 201 (Créé) et l'ID du nouvel élément inséré
    res.status(201).json({ insertId });
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

// Exportation de la fonction pour pouvoir l'utiliser dans d'autres fichiers
module.exports = {
  handleFormSubmission,
};
