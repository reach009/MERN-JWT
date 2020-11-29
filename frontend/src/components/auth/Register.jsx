import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import axios from "axios";

import UserContext from "../../context/userContext";

import ErrorNotice from "../misc/ErrorNotice";

function Register() {
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  const [passwordCheck, setPasswordCheck] = useState();

  const [displayName, setDiplayName] = useState();

  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };

      await axios.post("http://localhost:5000/users/register", newUser);

      const loginResponse = await axios.post(
        "http://localhost:5000/users/login",
        {
          email,
          password,
        }
      );

      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });

      localStorage.setItem("auth-token", loginResponse.data.token);

      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className='container h-100'>
      <h2>Register</h2>

      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}

      <form onSubmit={submit} className='justify-content-center'>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label for='email'>Email: </label>

            <input
              className='form-control'
              type='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='col'></div>

          <div className='form-group col-md-6'>
            <label for='password'>Password: </label>

            <input
              className='form-control'
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='col'></div>

          <div className='form-group col-md-6'>
            <label for='confirm-password'>Confirm Password: </label>
            <input
              className='form-control'
              type='password'
              id='confirm-password'
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>

          <div className='col'></div>

          <div className='form-group col-md-6'>
            <label for='display-name'>Display name</label>
            <input
              className='form-control'
              type='text'
              id='display-name'
              onChange={(e) => setDiplayName(e.target.value)}
            />
          </div>
        </div>

        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
    </div>
  );
}

export default Register;
