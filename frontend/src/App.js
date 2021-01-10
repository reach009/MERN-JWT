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
  // const [userData, setUserData] = useState({
  //   token: undefined,
  //   user: undefined,
  //   isAuthenticated: false,
  // });

  // useEffect(() => {
  //   const checkedLogin = async () => {
  //     const token = localStorage.getItem("auth-token");

  //     if (token === null) {
  //       localStorage.setItem("auth-token", "");
  //       token = "";
  //     }

  //     const tokenResponse = await axios.post(
  //       "http://localhost:5000/users/tokenIsValid",
  //       null,
  //       { headers: { "x-auth-token": token } }
  //     );
  //     if (tokenResponse.data) {
  //       const userRes = await axios.get("http://localhost:5000/users/", {
  //         headers: { "x-auth-token": token },
  //       });

  //       setUserData({
  //         token: token,
  //         user: userRes.data,
  //         isAuthenticated: true,
  //       });
  //     }
  //   };

  //   checkedLogin();
  // }, []);

  // console.log("User data: " + JSON.stringify(userData.token));

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
