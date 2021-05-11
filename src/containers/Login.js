import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import Preloader from "../components/Preloader";
import "../index.css";

const Login = ({ setUser }) => {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const fromPublish = location.state?.fromPublish ? true : null;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        setIsLoading(false);
        history.push(fromPublish ? "/publish" : "/");
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMessage(
          "L’adresse courriel ou le mot de passe que vous avez entré n’est pas valide. Veuillez réessayer."
        );
        setIsLoading(false);
      }
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
          placeholder="Adresse email"
          type="email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Mot de passe"
          type="password"
        />
        <span className="signup-login-error">{errorMessage}</span>
        {isLoading ? (
          <Preloader />
        ) : (
          <button disabled={isLoading ? true : false} type="submit">
            Se connecter
          </button>
        )}
      </form>
      <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
    </div>
  );
};

export default Login;
