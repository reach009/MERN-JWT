import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";

function AuthOptions() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");

  const login = () => history.push("/login");

  const logout = () => {
    setUserInfo({
      token: undefined,
      user: undefined,
      isAuthenticated: false,
    });

    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="auth-options">
      {userInfo.user ? (
        <button className="btn btn-primary mr-2" onClick={logout}>
          Logout
        </button>
      ) : (
        <>
          <button className="btn btn-primary mr-2" onClick={register}>
            Sign Up
          </button>
          <button className="btn btn-primary mr-2" onClick={login}>
            Login
          </button>
        </>
      )}
    </nav>
  );
}

export default AuthOptions;
