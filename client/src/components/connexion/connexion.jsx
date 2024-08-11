import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";
import "./connexion.css";

function Login() {
  const ApiUrl = import.meta.env.VITE_API_URL;
  
  // Fonction pour afficher une notification de succès lors de la connexion
  const notifySuccess = (username) => toast.success(`Bienvenue, ${username} !`);
  // Fonction pour afficher une notification d'échec lors de la connexion
  const notifyFail = () => toast.error("Une erreur s'est produite");

  // Hook pour naviguer entre les pages
  const navigate = useNavigate();

  // Récupère la fonction de connexion à partir du contexte utilisateur
  const { login } = useUserContext();

  // État pour stocker les informations de connexion (email et mot de passe)
  const [loginInfos, setLoginInfos] = useState({
    mail: "",
    password: "",
  });

  // Mise à jour de l'état lorsque l'utilisateur entre ses informations de connexion
  const handleLoginInfos = (e) => {
    setLoginInfos({ ...loginInfos, [e.target.name]: e.target.value });
  };

  // Gestionnaire de soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validation basique pour s'assurer que l'email et le mot de passe ne sont pas vides
    if (loginInfos.mail.trim() === "" || loginInfos.password.trim() === "") {
      console.error("Mail and password must be non-empty strings");
      return;
    }

    try {
      // Appel à l'API pour tenter une connexion
      const response = await fetch(`${ApiUrl}/auth/connexion`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // envoyer / recevoir le cookie à chaque requête
        body: JSON.stringify(loginInfos),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        console.info("API response:", responseData);
        if (responseData.user) {
          const { username } = responseData.user;
          
          // Connecte l'utilisateur en stockant ses données dans le contexte
          login(responseData.user);
          
          // Redirection en fonction du rôle de l'utilisateur
          if (loginInfos.pseudo === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }

          // Affiche un message de bienvenue
          notifySuccess(username);
        } else {
          console.error("User object is missing in the response");
        }
      } else {
        console.info("Login failed with status:", response.status);
        notifyFail();
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <div className="form-group1">
          <label htmlFor="mail">Adresse mail</label>
          <input
            type="mail"
            name="mail"
            value={loginInfos.mail}
            onChange={handleLoginInfos}
          />
        </div>
        <div className="form-group2">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={loginInfos.password}
            onChange={handleLoginInfos}
          />
        </div>
        <div className="back-home">
          <button type="submit" className="validate">
            Se connecter
          </button>
        </div>
      </form>
      <Link to="/inscription" className="create">
        <p>Créez un compte</p>
      </Link>
    </div>
  );
}

export default Login;
