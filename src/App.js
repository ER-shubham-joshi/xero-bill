import React, { useEffect } from "react";

import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Client from "./pages/Client";
import NewClient from "./pages/NewClient";
import Login from "./pages/Login";

import { auth, db } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        db.collection("users").onSnapshot((snapshot) => {
          snapshot.docs.length &&
            dispatch({
              type: "SET_CLIENTS",
              clients: snapshot.docs.map((doc) => doc.data())[0]?.clients,
            });
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/client">
            <Client />
          </Route>
          <Route path="/addClient">
            <NewClient />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
