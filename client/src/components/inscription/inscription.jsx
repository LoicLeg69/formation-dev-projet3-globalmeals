import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./inscription.css"; // Importation des styles CSS pour le composant Register

function Register() {
  const ApiUrl = import.meta.env.VITE_API_URL; // URL de l'API stockée dans les variables d'environnement
  const notifySuccess = (text) => toast.success(text); // Fonction pour afficher une notification de succès
  const notifyFail = (text) => toast.error(text); // Fonction pour afficher une notification d'échec
  const [registerForm, setRegisterForm] = useState({
    username: "", // État pour stocker le pseudo de l'utilisateur
    mail: "", // État pour stocker l'adresse mail de l'utilisateur
    password: "", // État pour stocker le mot de passe de l'utilisateur
    confirmPassword: "", // État pour stocker la confirmation du mot de passe
  });
  const navigate = useNavigate(); // Hook pour la navigation 
  
  // Fonction pour mettre à jour l'état du formulaire lorsque les valeurs changent
  const handleRegisterForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmitForm = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch(`${ApiUrl}/auth/register`, {
        method: "post", // Méthode HTTP POST pour créer une ressource
        headers: { "Content-Type": "application/json" }, // En-têtes de la requête
        body: JSON.stringify(registerForm), // Corps de la requête contenant les données du formulaire
      });

      // Vérifie si la réponse est un succès (code HTTP 201)
      if (response.status === 201) {
        notifySuccess(
          "Votre profil a bien été créé. Vous pouvez vous connecter"
        ); // Affiche une notification de succès
        setTimeout(() => {
          navigate("/connexion"); // Redirection vers la page de connexion après 2 secondes
        }, 2000); // Délai de 2 secondes avant la redirection
      } else {
        // Affiche une notification d'échec et log les détails de la réponse
        console.info(response);
        notifyFail("Une erreur s'est produite");
      }
    } catch (err) {
      // Log des erreurs possibles lors de l'appel API
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="form-container">
      {/* Conteneur du formulaire d'inscription */}

      <div className="form-group1">
        <label htmlFor="username">Pseudo</label>
        <input
          type="text"
          name="username"
          className="nes-input" // Classe CSS pour le style de l'input
          value={registerForm.username} // Valeur du champ contrôlée par l'état
          onChange={handleRegisterForm} // Fonction pour gérer les changements de valeur
        />
      </div>
      <div className="form-group2">
        <label htmlFor="mail">Adresse mail</label>
        <input
          type="mail"
          name="mail"
          className="nes-input" // Classe CSS pour le style de l'input
          value={registerForm.mail} // Valeur du champ contrôlée par l'état
          onChange={handleRegisterForm} // Fonction pour gérer les changements de valeur
        />
      </div>

      <div className="form-group3">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          className="nes-input" // Classe CSS pour le style de l'input
          value={registerForm.password} // Valeur du champ contrôlée par l'état
          onChange={handleRegisterForm} // Fonction pour gérer les changements de valeur
        />
      </div>
      <div className="form-group4">
        <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
        <input
          type="password"
          name="confirmPassword"
          className="nes-input" // Classe CSS pour le style de l'input
          value={registerForm.confirmPassword} // Valeur du champ contrôlée par l'état
          onChange={handleRegisterForm} // Fonction pour gérer les changements de valeur
        />
      </div>
      <button type="submit" className="validate2">
        S'enregistrer
      </button>
    </form>
  );
}

export default Register; // Exportation du composant Register pour qu'il puisse être utilisé dans d'autres parties de l'application
