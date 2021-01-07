import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import UserContext from "./context/userContext";
import "./App.css";
// routes
import routes from "./config/routes";
import AppRoute from "./components/routes/AppRoute";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    isAuthenticated: false,
  });

  let token = localStorage.getItem("auth-token");

  useEffect(() => {
    const checkedLogin = async () => {
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenResponse = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token: token,
          user: userRes.data,
          isAuthenticated: true,
        });
      }
    };

    checkedLogin();
  }, []);

  console.log("User data: " + JSON.stringify(userData.token));

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <BrowserRouter>
        <Header />
        <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
