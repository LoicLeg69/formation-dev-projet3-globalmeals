const AbstractRepository = require("./AbstractRepository"); // Importation de la classe AbstractRepository

class UserRepository extends AbstractRepository {
  constructor() {
    // Appel du constructeur de la classe parente (AbstractRepository)
    // et passage du nom de la table "user" en tant que configuration
    super({ table: "user" });
  }

  // La méthode de création (Create) du CRUD

  async create(user) {
    // Récupération de l'email de l'administrateur à partir des variables d'environnement
    const adminEmail = process.env.ADMIN_EMAIL; 
    // Détermination du rôle de l'utilisateur : "admin" si l'email correspond à celui de l'administrateur, sinon "user"
    const role = user.mail === adminEmail ? "admin" : "user";

    // Exécution de la requête SQL INSERT pour ajouter un nouvel utilisateur dans la table "user"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, mail, password, role) VALUES (?, ?, ?, ?)`,
      [user.username, user.mail, user.hashedPassword, role]
    );

    // Retourne l'ID de l'utilisateur nouvellement inséré
    return result.insertId;
  }

  // La méthode de lecture (Read) - R du CRUD (tous les utilisateurs)
  async readAll() {
    // Exécution de la requête SQL SELECT pour récupérer toutes les lignes de la table "user"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Retourne le tableau des lignes récupérées
    return rows;
  }

  // Méthode de lecture (Read) - R du CRUD (utilisateur par email avec mot de passe)
  async readByEmailWithPassword(email) {
    // Exécution de la requête SQL SELECT pour récupérer l'utilisateur correspondant à l'email
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE mail = ?`,
      [email]
    );

    // Retourne la première ligne si elle est trouvée, sinon null
    return rows.length > 0 ? rows[0] : null;
  }
}

module.exports = UserRepository; // Exportation de la classe UserRepository
