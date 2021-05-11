import React from "react";
import { useHistory } from "react-router-dom";

import Preloader from "../components/Preloader";
import Card from "../components/Card";
import torn from "../assets/img/torn.svg";
import "../index.css";

const Home = ({ data, isLoading }) => {
  const history = useHistory();

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <div className="home-banner-img">
        <img src={torn} alt="" className="home-banner-effect" />
        <div>
          <div className="home-banner-text">
            Prêts à faire du tri dans vos placards ?
            <button
              onClick={() => {
                history.push("/publish");
              }}
            >
              Commencer à vendre
            </button>
          </div>
        </div>
      </div>
      <div className="home-card-container">
        {data.offers &&
          data.offers.map((card, index) => {
            return <Card key={index} data={card} />;
          })}
      </div>
    </>
  );
};

export default Home;
