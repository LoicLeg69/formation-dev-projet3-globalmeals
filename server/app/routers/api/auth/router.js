// Importation du module Express pour créer un routeur
const express = require("express");

// Création d'une instance de routeur Express
const router = express.Router();

/* ************************************************************************* */
// Définir les routes de l'API ici
/* ************************************************************************* */

// Importation des actions liées à l'authentification
const { connexion, logout } = require("../../../controllers/authActions");
const { add, read } = require("../../../controllers/userActions");
const {
  hashPassword,
  verifyToken,
} = require("../../../services/middlewares/auth");

// Route pour la connexion de l'utilisateur
router.post("/connexion", connexion);

// Route pour l'enregistrement d'un nouvel utilisateur avec hachage du mot de passe
router.post("/register", hashPassword, add);

// Route pour la déconnexion de l'utilisateur
router.get("/logout", logout);

// Route pour récupérer le profil d'un utilisateur spécifique, protégée par vérification du token
router.get("/:id", verifyToken, read);

/* ************************************************************************* */

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
