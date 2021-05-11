import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Offer from "./containers/Offer";
import Payment from "./containers/Payment";
import Publish from "./containers/Publish";
import Signup from "./containers/Signup";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCheck, faRedo } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faCheck, faRedo);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search]);
  return (
    <Router>
      <Header setUser={setUser} token={token} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home data={data} isLoading={isLoading} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/publish">
          <Publish token={token} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
