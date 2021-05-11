import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        { email: email, password: password, username: username }
      );
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cette adresse email est déjà utilisée.");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Nom d'utilisateur"
          type="text"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
          placeholder="Email"
          type="email"
        />
        <span className="signup-login-error-message">{errorMessage}</span>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Mot de passe"
          type="password"
        />
        <div className="checkbox-container">
          <div>
            <input type="checkbox" /> <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant, je confirme que j'ai accepté les Termes &
            Conditions de Vinted, avoir lu la Politique de Confidentialité, et
            que j'ai plus de 18 ans.
          </p>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
    </div>
  );
};

export default Signup;
