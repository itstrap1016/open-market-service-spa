import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import NotFound from "./pages/NotFound.js";
import SignUp from "./pages/SignUp.js";
import ProductDetail from "./pages/ProductDetail.js";

const routes = {
  "/": Home,
  "/login": Login,
  "/product/:id": ProductDetail,
  "/signup": SignUp,
};

routes["404"] = NotFound;

export default routes;
