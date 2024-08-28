// Importation de la classe abstraite AbstractSeeder
const AbstractSeeder = require("./AbstractSeeder");

// Définition de la classe MenuSeeder qui étend AbstractSeeder
class MenuSeeder extends AbstractSeeder {
  constructor() {
    // Appel du constructeur de la classe parente avec les paramètres spécifiques à la table "menu"
    super({ table: "menu", truncate: true });
  }

  // Méthode pour exécuter les opérations de peuplement des données
  run() {
    // Définition des données à insérer dans la table "menu"
    const menus = [
      {
        id: "1",
        continent: "Europe",
        country: "Italien",
        refName: "europeItalien",
      },
      {
        id: "2",
        continent: "Afrique",
        country: "Sénégalais",
        refName: "afriqueSenegal",
      },
      {
        id: "3",
        continent: "Amerique",
        country: "Texan",
        refName: "texasAmerique",
      },
      {
        id: "4",
        continent: "Asie",
        country: "Japonais",
        refName: "asieJapon",
      },
      {
        id: "5",
        continent: "Oceanie",
        country: "Tahitien",
        refName: "oceanieTahitien",
      },
    ];

    // Itération sur les données et insertion dans la base de données
    menus.forEach((menu) => {
      this.insert(menu); // Appel de la méthode insert héritée de AbstractSeeder
    });
  }
}

// Exportation de la classe MenuSeeder pour l'utiliser dans d'autres parties de l'application
module.exports = MenuSeeder;
