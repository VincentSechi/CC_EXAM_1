// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../services/api';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRules = [
  { test: (value) => value.length >= 12, message: 'Au moins 12 caractères' },
  { test: (value) => /[A-Z]/.test(value), message: 'Une lettre majuscule' },
  { test: (value) => /[a-z]/.test(value), message: 'Une lettre minuscule' },
  { test: (value) => /\d/.test(value), message: 'Un chiffre' },
  { test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), message: 'Un caractère spécial' },
];

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password) =>
    passwordRules
      .filter((rule) => !rule.test(password))
      .map((rule) => rule.message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const sanitizedData = {
      username: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    if (!sanitizedData.username || !sanitizedData.email || !sanitizedData.password) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    if (!emailRegex.test(sanitizedData.email)) {
      setError("L'adresse email est invalide.");
      return;
    }

    const passwordIssues = validatePassword(sanitizedData.password);
    if (passwordIssues.length) {
      setError(`Le mot de passe doit contenir : ${passwordIssues.join(', ')}.`);
      return;
    }

    try {
      await apiClient.post('/auth/register', sanitizedData);
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      navigate('/login');
    } catch (err) {
      if (err.response) {
        const { message } = err.response.data;
        setError(message);
      } else {
        console.error('Erreur réseau ou serveur', err);
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
