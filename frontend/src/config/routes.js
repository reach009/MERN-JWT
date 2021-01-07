import Login from "../components/auth/Login";
import Home from "../components/pages/Home";
import Register from "../components/auth/Register";

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/",
    component: Home,
    isPrivate: true,
  },
  {
    path: "/register",
    component: Register,
    isPrivate: false,
  },
];

export default routes;
