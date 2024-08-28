// Importation des modules de répertoire responsables des opérations sur les tables
const MenuRepository = require("./models/MenuRepository");
const RecipeRepository = require("./models/RecipeRepository");
const UserRepository = require("./models/UserRepository");

// Création d'un objet vide pour contenir les répertoires de données pour différentes tables
const tables = {};

/* ************************************************************************* */
// Enregistrement des répertoires de données pour les tables
/* ************************************************************************* */

// Enregistrement de chaque répertoire comme point d'accès aux données pour sa table
tables.menu = new MenuRepository();
tables.recipe = new RecipeRepository();
tables.user = new UserRepository();

/* ************************************************************************* */

// Utilisation d'un Proxy pour personnaliser les messages d'erreur lors de l'accès à une table inexistante

// Exportation de l'instance Proxy avec une gestion des erreurs personnalisée
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Vérifier si la propriété (table) existe dans l'objet tables
    if (prop in obj) return obj[prop];

    // Si la propriété (table) n'existe pas, lancer une ReferenceError avec un message d'erreur personnalisé
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
