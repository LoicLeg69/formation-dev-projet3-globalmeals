// Importation du module Express pour créer un routeur
const express = require("express");

// Création d'une instance de routeur Express
const router = express.Router();

/* ************************************************************************* */
// Importer et utiliser les sous-routeurs ici
/* ************************************************************************* */

// Importation des sous-routeurs pour les différentes fonctionnalités
const menuRouter = require("./menu/router");
const recipeRouter = require("./recipe/router");
const adminRouter = require("./admin/router");
const authRouter = require("./auth/router");

// Utilisation du sous-routeur pour les routes liées aux menus
router.use("/menu", menuRouter);

// Utilisation du sous-routeur pour les routes liées aux recettes
router.use("/recipe", recipeRouter);

// Utilisation du sous-routeur pour les routes liées à l'administration
router.use("/admin", adminRouter);

// Utilisation du sous-routeur pour les routes liées à l'authentification
router.use("/auth", authRouter);

/* ************************************************************************* */

// Exportation du routeur principal pour l'utiliser dans d'autres parties de l'application
module.exports = router;
