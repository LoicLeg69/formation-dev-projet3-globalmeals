/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Importation de la bibliothèque Faker pour générer des données fictives
const { faker } = require("@faker-js/faker");

// Importation du client de base de données
const database = require("../client");

// Déclaration d'un objet pour stocker les objets créés en fonction de leurs noms
const refs = {};

// Classe abstraite pour les seeder
class AbstractSeeder {
  constructor({ table, truncate = true, dependencies = [] }) {
    // Vérifier que la classe abstraite ne peut pas être instanciée directement
    // Référence : https://www.codeheroes.fr/2017/11/08/js-classes-abstraites-et-interfaces/
    if (this.constructor === AbstractSeeder) {
      throw new TypeError(
        "La classe abstraite 'AbstractSeed' ne peut pas être instanciée directement"
      );
    }

    // Initialiser les propriétés de la classe
    this.table = table;
    this.truncate = truncate; // Indique si la table doit être vidée avant l'insertion
    this.dependencies = dependencies; // Liste des dépendances pour l'ordre d'exécution
    this.promises = []; // Stocke les promesses d'insertion
    this.faker = faker; // Fournit un accès à Faker pour générer des données
    this.refs = refs; // Références aux objets créés
  }

  // Méthode privée pour insérer des données dans la base de données
  async #doInsert(data) {
    // Extraire le nom de référence (s'il existe) et les valeurs
    const { refName, ...values } = data;

    // Préparer la requête SQL : "insert into <table>(<fields>) values (<placeholders>)"
    const fields = Object.keys(values).join(","); // Champs de la table
    const placeholders = new Array(Object.keys(values).length) // Placeholders pour les valeurs
      .fill("?")
      .join(",");

    const sql = `insert into ${this.table}(${fields}) values (${placeholders})`;

    // Exécuter la requête SQL et, si applicable, stocker l'ID d'insertion selon le nom de référence
    const [result] = await database.query(sql, Object.values(values));

    if (refName != null) {
      const { insertId } = result;

      // Stocker les données avec l'ID d'insertion dans les références
      refs[refName] = { ...values, insertId };
    }
  }

  // Ajouter une insertion à la liste des promesses
  insert(data) {
    this.promises.push(this.#doInsert(data));
  }

  // Méthode abstraite que les sous-classes doivent implémenter
  // eslint-disable-next-line class-methods-use-this
  run() {
    throw new Error("Vous devez implémenter cette fonction");
  }

  // Obtenir une référence à un objet créé basé sur le nom
  // eslint-disable-next-line class-methods-use-this
  getRef(name) {
    return refs[name];
  }
}

// Prêt à être exporté
module.exports = AbstractSeeder;
