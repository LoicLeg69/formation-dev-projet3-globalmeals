// Importation du client de base de données
const database = require("../client");

// Définition de la classe abstraite AbstractRepository
class AbstractRepository {
  constructor({ table }) {
    // Vérification pour s'assurer que cette classe abstraite ne peut pas être instanciée directement
    if (this.constructor === AbstractRepository) {
      throw new TypeError(
        "Abstract class 'AbstractRepository' cannot be instantiated directly"
      );
    }

    // Stockage du nom de la table dans une propriété
    this.table = table;

    // Fourniture de l'accès au client de base de données
    this.database = database;
  }
}

// Exportation de la classe AbstractRepository pour l'utiliser dans d'autres parties de l'application
module.exports = AbstractRepository;
