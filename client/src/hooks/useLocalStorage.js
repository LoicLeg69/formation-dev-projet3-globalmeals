import { useState, useEffect } from "react";

/**
 * Fonction pour obtenir une valeur depuis le stockage local.
 * Si la valeur existe et est au format JSON (objet ou tableau), elle sera parsée.
 * Sinon, la valeur par défaut sera renvoyée.
 * 
 * @param {string} key - La clé pour accéder à la valeur dans le stockage local.
 * @param {any} defaultValue - La valeur par défaut à renvoyer si aucune valeur n'est trouvée.
 * @returns {any} - La valeur stockée ou la valeur par défaut.
 */
function getStorageValue(key, defaultValue) {
  // Récupère la valeur du stockage local pour la clé donnée
  let saved = localStorage.getItem(key) || "";
  
  // Si la valeur récupérée commence par "{" ou "[", elle est au format JSON, donc elle sera parsée
  if (saved.startsWith("{") || saved.startsWith("[")) {
    saved = JSON.parse(saved);
  }
  
  // Retourne la valeur récupérée ou la valeur par défaut
  return saved || defaultValue;
}

/**
 * Hook personnalisé pour gérer le stockage local.
 * Il fournit un état local qui est synchronisé avec le stockage local du navigateur.
 * 
 * @param {string} key - La clé pour accéder au stockage local.
 * @param {any} defaultValue - La valeur par défaut à utiliser si aucune valeur n'est trouvée.
 * @returns {[any, Function]} - Un tableau contenant la valeur stockée et une fonction pour mettre à jour cette valeur.
 */
const useLocalStorage = (key, defaultValue) => {
  // Initialise l'état avec la valeur stockée dans le localStorage ou la valeur par défaut
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  // Effet secondaire pour synchroniser l'état avec le localStorage
  useEffect(() => {
    // Convertit la valeur en JSON si elle est un objet, sinon la garde telle quelle
    const storedVal = typeof value === "object" ? JSON.stringify(value) : value;
    
    // Met à jour le stockage local avec la valeur actuelle
    localStorage.setItem(key, storedVal);
  }, [value, key]); // Dépendances : l'effet sera réexécuté lorsque `value` ou `key` changent

  // Retourne l'état actuel et la fonction pour le mettre à jour
  return [value, setValue];
};

export default useLocalStorage;
