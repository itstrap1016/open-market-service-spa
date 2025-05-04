import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import NotFound from "./pages/NotFound.js";
import SignUp from "./pages/SignUp.js";

const routes = {
  "/": Home,
  "/login": Login,
  "/signup": SignUp,
};

routes["404"] = NotFound;

export default routes;
