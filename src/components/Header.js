import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/logo.svg";

const Header = ({ token, setUser, setSearch }) => {
  const history = useHistory();
  return (
    <div className="header-container">
      <div
        onClick={() => {
          history.push("/");
        }}
      >
        <img className="header-logo" src={logo} alt="vinted-logo" />
      </div>
      <div className="search-container">
        <FontAwesomeIcon icon="search" className="search-input-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      {token ? (
        <button
          onClick={() => {
            setUser(null);
          }}
          className="button-logout"
        >
          Se déconnecter
        </button>
      ) : (
        <div>
          <button
            onClick={() => {
              history.push("/signup");
            }}
            className="header-button button-login button-signup"
          >
            S'inscrire
          </button>
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="header-button button-login"
          >
            Se connecter
          </button>
        </div>
      )}
      <button
        onClick={() => {
          history.push("/publish");
        }}
        className="header-button button-sell"
      >
        Vends tes articles
      </button>
    </div>
  );
};

export default Header;
