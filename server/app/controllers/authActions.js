// Importation des modules nécessaires pour le hachage des mots de passe et la gestion des tokens JWT
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Importation de l'accès aux tables de la base de données
const tables = require("../../database/tables");

const connexion = async (req, res, next) => {
  try {
    // Récupération d'un utilisateur spécifique de la base de données en fonction de l'email fourni
    const user = await tables.user.readByEmailWithPassword(req.body.mail);

    // Si l'utilisateur n'est pas trouvé, renvoyer une réponse avec le statut HTTP 422
    if (user === null) {
      res.sendStatus(422);
      return;
    }

    // Vérification du mot de passe fourni avec le mot de passe haché stocké
    const verified = await argon2.verify(user.password, req.body.password);

    if (verified === true) {
      // Suppression du mot de passe haché des données utilisateur pour ne pas l'inclure dans la réponse
      delete user.hashed_password;

      // Génération d'un token JWT signé avec l'ID de l'utilisateur et son rôle
      const token = await jwt.sign(
        { sub: user.id, role: user.role },
        process.env.APP_SECRET,
        {
          expiresIn: "1h", // Le token expirera dans 1 heure
        }
      );

      // Suppression de l'ID et du mot de passe de l'utilisateur des données envoyées dans la réponse
      delete user.id;
      delete user.password;

      // Envoi du token dans un cookie HTTP-Only pour le sécuriser et de l'utilisateur (sans le mot de passe) au client
      res
      .cookie("access_token", token, {
        httpOnly: true, // Empêche l'accès aux cookies côté client (ex: via Javascript)
        sameSite: "Lax", // Le mode Lax ajoute une exception pour l'envoi du cookie si la requête ne provient pas du site d'origine
        secure: process.env.NODE_ENV === "production", // Empêche l'envoi d'un cookie sur une page non sécurisée (http simple)
        maxAge: 3600000, // Durée de vie du cookie, doit correspondre à la durée du token JWT. Temps en millisecondes (1000 = 1s => 3 600 000 = 1h)
      })
      .json({ user }); // Réponse au client avec les informations de l'utilisateur (sans le mot de passe)
    } else {
      // Si la vérification échoue, renvoyer une réponse avec le statut HTTP 422
      res.sendStatus(422);
    }
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

// Fonction pour déconnecter l'utilisateur en supprimant le cookie JWT et en renvoyant une réponse avec le statut HTTP 200
const logout = (req, res) => {
  res.clearCookie("access_token").sendStatus(200);
};

// Exportation des fonctions de connexion et de déconnexion pour les utiliser dans d'autres fichiers
module.exports = {
  connexion,
  logout,
};
