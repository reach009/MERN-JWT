import React, { useContext } from "react";

import { Link } from "react-router-dom";

import UserContext from "../../context/userContext";

function Home() {
  const { userInfo } = useContext(UserContext);

  // console.log("Home data ", userInfo.user);

  return (
    <div>
      {userInfo.user ? <h1>Welcome {userInfo.user.displayName}</h1> : ""}
    </div>
  );
}

export default Home;
