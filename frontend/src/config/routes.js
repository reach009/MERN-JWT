import Login from "../components/auth/Login";
import Home from "../components/pages/Home";
import Register from "../components/auth/Register";
import NotFound from "../components/pages/NotFound";

const routes = [
  {
    path: "/login",
    component: Login,
    exact: true,
    isPrivate: false,
  },
  {
    path: "/",
    component: Home,
    exact: true,
    isPrivate: true,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
    isPrivate: false,
  },
  {
    path: "",
    component: NotFound,
    isPrivate: false,
  },
];

export default routes;
