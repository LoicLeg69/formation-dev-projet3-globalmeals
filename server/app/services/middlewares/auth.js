// Importation des modules nécessaires pour le hachage des mots de passe et la gestion des tokens JWT
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Options de hachage pour Argon2
// Voir la documentation pour plus de détails : https://github.com/ranisalt/node-argon2/wiki/Options
// Recommandations minimales de l'OWASP : https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
  type: argon2.argon2id, // Type d'algorithme de hachage
  memoryCost: 19 * 2 ** 10, // Coût de la mémoire en kio (19 Mo)
  timeCost: 2, // Nombre d'itérations de hachage
  parallelism: 1, // Nombre de threads parallèles utilisés pour le hachage
};

// Middleware pour hacher le mot de passe avant de le sauvegarder
const hashPassword = async (req, res, next) => {
  try {
    // Extraction du mot de passe de la requête
    const { password } = req.body;

    // Hachage du mot de passe avec les options spécifiées
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // Remplacement du mot de passe non haché par le mot de passe haché dans la requête
    req.body.hashedPassword = hashedPassword;

    // Suppression du mot de passe non haché de la requête pour des raisons de sécurité
    delete req.body.password;

    // Passer au middleware suivant
    next();
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

// Middleware pour vérifier la validité du token JWT dans l'en-tête de la requête
const verifyToken = (req, res, next) => {
  try {
    // Vérifier la présence de l'en-tête "Authorization"
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader === null) {
      throw new Error("Authorization header is missing");
    }

    // Vérifier que l'en-tête est de la forme "Bearer <token>"
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    // Vérifier la validité du token JWT et extraire le payload
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    // Passer au middleware suivant
    next();
  } catch (err) {
    console.error(err);

    // Répondre avec le statut HTTP 401 (Non autorisé) en cas d'erreur
    res.sendStatus(401);
  }
};

// Middleware pour vérifier la validité du token JWT dans les cookies
const verifyCookie = (req, res, next) => {
  try {
    // Récupérer le token depuis les cookies
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(401); // Répondre avec le statut HTTP 401 si le token est manquant
    }

    // Vérifier la validité du token JWT et extraire le payload
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    // Passer au middleware suivant
    return next();
  } catch (err) {
    // Répondre avec le statut HTTP 404 (Non trouvé) en cas d'erreur et message d'erreur
    return res.sendStatus(404).send("Il y a eu une erreur");
  }
};

// Exportation des middlewares pour les utiliser dans d'autres parties de l'application
module.exports = {
  hashPassword,
  verifyToken,
  verifyCookie,
};
