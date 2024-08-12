// Importation de la classe de base AbstractRepository
const AbstractRepository = require("./AbstractRepository");

// Définition de la classe RecipeRepository qui étend AbstractRepository
class RecipeRepository extends AbstractRepository {
  constructor() {
    // Appel du constructeur de la classe parente (AbstractRepository)
    // en passant le nom de la table "Recipe" comme configuration
    super({ table: "Recipe" });
  }

  // Méthode C de CRUD - Opération de création

  async create(recipe) {
    // Exécute la requête SQL INSERT pour ajouter une nouvelle recette dans la table "Recipe"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, ingredient, step, step_time, type, image, menu_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.name,        
        recipe.ingredient,  
        recipe.step,       
        recipe.step_time,   
        recipe.type,        
        recipe.image,      
        recipe.menu_id,     // ID du menu auquel appartient la recette
      ]
    );

    // Retourne l'ID de la recette nouvellement insérée
    return result.insertId;
  }

  // Méthode U de CRUD - Opération de mise à jour

  async update(recipe) {
    // Exécute la requête SQL UPDATE pour mettre à jour une recette existante dans la table "Recipe"
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, ingredient = ?, step = ?, step_time = ?, type = ?, image = ?, menu_id = ? WHERE type = ? AND menu_id = ?`,
      [
        recipe.name,        
        recipe.ingredient,  
        recipe.step,       
        recipe.step_time,  
        recipe.type,        
        recipe.image,       
        recipe.menu_id,     
        recipe.type,        
        recipe.menu_id,     // ID du menu auquel appartient la recette (condition)
      ]
    );

    // Retourne le résultat de la mise à jour
    return result;
  }

  // Méthodes R de CRUD - Opérations de lecture

  async readAll() {
    // Exécute la requête SQL SELECT pour récupérer toutes les lignes de la table "Recipe"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Retourne le tableau des lignes récupérées
    return rows;
  }

  async readByContinent(continent) {
    // Exécute la requête SQL SELECT pour récupérer toutes les lignes de la table "Recipe" 
    // en les joignant avec la table "menu" basée sur l'ID du menu et filtre par continent
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} INNER JOIN menu ON recipe.menu_id = menu.id WHERE continent = ?`,
      [continent] // Filtre par continent
    );

    // Retourne le tableau des lignes récupérées
    return rows;
  }
}

// Exportation de la classe RecipeRepository
module.exports = RecipeRepository;
