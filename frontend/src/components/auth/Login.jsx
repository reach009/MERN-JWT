import React, { useState, useEffect, useContext } from "react";

import { useHistory } from "react-router-dom";

import axios from "axios";

import UserContext from "../../context/userContext";

import ErrorNotice from "../misc/ErrorNotice";

function Login() {
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  const [error, setError] = useState();

  const { userInfo, setUserInfo } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };

      const loginResponse = await axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );

      setUserInfo({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
        isAuthenticated: true,
      });

      localStorage.setItem("auth-token", loginResponse.data.token);

      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (userInfo.user) {
      history.push("/");
    }
  }, [userInfo.user]);

  return (
    <div className="login">
      <h2>Login</h2>

      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}

      <form onSubmit={submit}>
        <label>Email: </label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default Login;
