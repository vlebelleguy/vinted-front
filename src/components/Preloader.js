import React from "react";
import preloader from "../assets/img/preloader.gif";

const Preloader = () => {
  return (
    <div>
      <img
        src={preloader}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading"
      />
    </div>
  );
};

export default Preloader;
