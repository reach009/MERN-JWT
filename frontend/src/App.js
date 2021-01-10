import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import { UserProvider } from "./context/userContext";
import "./App.css";
// routes
import routes from "./config/routes";
import AppRoute from "./components/routes/AppRoute";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
              isPrivate={route.isPrivate}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
