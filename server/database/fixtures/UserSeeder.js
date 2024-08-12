const argon2 = require('argon2'); // Importation du module Argon2 pour le hachage des mots de passe
const AbstractSeeder = require("./AbstractSeeder"); // Importation de la classe abstraite AbstractSeeder

// Définition des options de hachage pour Argon2
const hashingOptions = {
  type: argon2.argon2id, // Utilisation de l'algorithme Argon2id (hybride entre Argon2i et Argon2d)
  memoryCost: 19 * 2 ** 10, /* Coût mémoire : 19 Mio en Kio (19 * 1024 Kio) pour le processus de hachage */
  timeCost: 2, // Coût en temps : le nombre d'itérations pour le processus de hachage
  parallelism: 1, // Nombre de threads (parallélisme) utilisés pour le processus de hachage
};

// Déclaration de la classe UserSeeder qui étend la classe AbstractSeeder
class UserSeeder extends AbstractSeeder {
  constructor() {
    // Appel du constructeur de la classe parente (AbstractSeeder) avec les options appropriées
    super({ table: "user", truncate: true }); // Le tableau cible est "user", et on demande de tronquer la table avant l'insertion
  }

  // Méthode run - Remplit la table 'user' avec des données fictives
  async run() {
    // Génère et insère des données fictives dans la table 'user'
    for (let i = 0; i < 10; i += 1) { // Boucle pour créer 10 utilisateurs fictifs

      /* eslint-disable no-await-in-loop */ // Désactive l'avertissement ESLint pour l'utilisation d'await dans une boucle

      // Hachage du mot de passe "toto1234" en utilisant Argon2 avec les options définies
      const hashedPassword = await argon2.hash("toto1234", hashingOptions); 

      // Création d'un utilisateur fictif avec un nom, un email et un mot de passe haché
      const fakeUser = {
        username: `user_${i}`, // Génère un nom d'utilisateur de la forme "user_0", "user_1", etc.
        mail: this.faker.internet.email(), // Génère un email fictif en utilisant la bibliothèque faker
        password: hashedPassword, // Associe le mot de passe haché
      };

      // Insère les données de l'utilisateur fictif dans la table 'user'
      await this.insert(fakeUser); // insert into user(username, mail, password) values (?, ?, ?)
    }
  }
}

// Exportation de la classe UserSeeder pour qu'elle puisse être utilisée ailleurs
module.exports = UserSeeder;
