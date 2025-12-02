// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../services/api";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const sanitizedCredentials = {
      username: credentials.username.trim(),
      password: credentials.password,
    };

    if (!sanitizedCredentials.username || !sanitizedCredentials.password) {
      setErrorMessage("Veuillez renseigner un identifiant et un mot de passe.");
      return;
    }

    try {
      const response = await apiClient.post(
        "/auth/login",
        sanitizedCredentials
      );
      const { role, username } = response.data;

      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      localStorage.setItem("isAuthenticated", "true");

      navigate("/"); // Redirige vers la page d'accueil après la connexion
    } catch (error) {
      // Gestion des erreurs
      if (error.response) {
        // Erreur renvoyée par le serveur
        const { message } = error.response.data;
        setErrorMessage(message);
      } else {
        // Erreur réseau ou autre
        console.error("Erreur réseau ou serveur", error);
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4" role="alert">
            {errorMessage}
          </p>
        )}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="border border-gray-300 p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="border border-gray-300 p-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
