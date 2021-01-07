import React, { useContext } from "react";

import { Link } from "react-router-dom";

import UserContext from "../../context/userContext";

function Home() {
  const { userData } = useContext(UserContext);

  console.log("Home data ", userData.user);

  return (
    <div>
      {userData.user ? <h1>Welcome {userData.user.displayName}</h1> : ""}
    </div>
  );
}

export default Home;
