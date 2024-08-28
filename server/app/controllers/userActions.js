// Importation de l'accès aux tables de la base de données
const tables = require("../../database/tables");

// B de BREAD - Opération Browse (Lire tous les utilisateurs)
const browse = async (req, res, next) => {
  try {
    // Récupérer tous les utilisateurs de la base de données
    const users = await tables.user.readAll();

    // Répondre avec les utilisateurs en format JSON
    res.json(users);
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

// R de BREAD - Opération Read (Lire un utilisateur spécifique)
const read = async (req, res, next) => {
  try {
    // Récupérer un utilisateur spécifique de la base de données en fonction de l'ID fourni
    const user = await tables.user.read(req.params.id);

    // Si l'utilisateur n'est pas trouvé, renvoyer une réponse avec le statut HTTP 404 (Non trouvé)
    // Sinon, répondre avec l'utilisateur en format JSON
    if (user === null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

// A de BREAD - Opération Add (Créer un nouvel utilisateur)
const add = async (req, res, next) => {
  // Extraire les données de l'utilisateur du corps de la requête
  const user = req.body;

  try {
    // Insérer l'utilisateur dans la base de données
    const insertId = await tables.user.create(user);

    // Répondre avec le statut HTTP 201 (Créé) et l'ID du nouvel utilisateur inséré
    res.status(201).json({ insertId });
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

// Prêt à exporter les fonctions du contrôleur
module.exports = {
  browse,
  read,
  add,
};
