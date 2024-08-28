// Importation de l'accès aux tables de la base de données
const tables = require("../../database/tables");

// B de BREAD - Opération Browse (Lire tous les éléments)
const browse = async (req, res, next) => {
  try {
    // Récupérer tous les éléments du menu à partir de la base de données
    const menu = await tables.menu.readAll();

    // Répondre avec les éléments en format JSON
    res.json(menu);
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

const add = async (req, res, next) => {
  // Extraire les données de l'élément du corps de la requête
  const formData = req.body;

  try {
    // Insérer l'élément dans la base de données
    const insertId = await tables.menu.create(formData);

    // Répondre avec le statut HTTP 201 (Créé) et l'ID du nouvel élément inséré
    res.status(201).json({ insertId });
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

// E de BREAD - Opération Edit (Mise à jour)
const edit = async (req, res, next) => {
  // Extraire les données de l'élément du corps de la requête
  const menu = req.body;

  try {
    // Mettre à jour l'élément dans la base de données
    const updatedMenu = await tables.menu.update(menu);

    // Répondre avec le statut HTTP 200 (OK) et les données mises à jour
    res.status(200).json({ updatedMenu });
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    // Récupérer un élément du menu en fonction du continent spécifié dans la requête
    const item = await tables.menu.readByContinent(req.query.continent);

    // Si l'élément n'est pas trouvé, renvoyer une réponse avec le statut HTTP 404
    if (item == null) {
      res.sendStatus(404);
    } else {
      // Sinon, répondre avec l'élément en format JSON
      res.json(item);
    }
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

// Prêt à exporter les fonctions du contrôleur
module.exports = {
  browse,
  add,
  edit,
  read,
};
