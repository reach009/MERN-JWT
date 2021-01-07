import { Redirect, Route } from "react-router-dom";
import React, { useContext } from "react";
import UserContext from "../../context/userContext";

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const token = localStorage.getItem("auth-token");

  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !token ? (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default AppRoutes;
