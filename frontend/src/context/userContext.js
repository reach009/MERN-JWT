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
