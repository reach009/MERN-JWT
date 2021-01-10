import axios from "axios";
import React, { useReducer, useEffect } from "react";

let reducer = (userData, newUserData) => {
  if (newUserData === null) {
    localStorage.removeItem("userData");
    return initialState;
  }
  return { ...userData, ...newUserData };
};

const initialState = {
  token: undefined,
  user: undefined,
  isAuthenticated: false,
};

const localState = JSON.parse(localStorage.getItem("userData"));

const UserContext = React.createContext();

function UserProvider(props) {
  const [userInfo, setUserInfo] = useReducer(
    reducer,
    localState || initialState
  );

  useEffect(() => {
    const checkedLogin = async () => {
      const token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      console.log(token);
      try {
        // check if the token is valid
        const tokenResponse = await axios.post(
          "http://localhost:5000/users/tokenIsValid",
          null,
          { headers: { "x-auth-token": token } }
        );

        // retrieve the user data
        if (tokenResponse.data) {
          const userRes = await axios.get("http://localhost:5000/users/", {
            headers: { "x-auth-token": token },
          });

          localStorage.setItem("userData", JSON.stringify(userInfo));
          // console.log("User info ", userInfo);
        }
      } catch (err) {
        console.log(err.response.data);
        localStorage.removeItem("userData");
        // console.log("User info ", userInfo);
      }
    };

    checkedLogin();
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserProvider };
