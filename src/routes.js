import Home from "./pages/Home.js";
import Login from "./pages/Login.js";

const routes = {
  "/": Home,
  "/login": Login,
};

routes["404"] = NotFound;

export default routes;
