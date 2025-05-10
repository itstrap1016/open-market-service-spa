import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import NotFound from "./pages/NotFound.js";
import SignUp from "./pages/SignUp.js";
import ProductDetail from "./pages/ProductDetail.js";
import { ROUTES } from "./constants/constants.js";

const routes = {
  [ROUTES.HOME]: Home,
  [ROUTES.LOGIN]: Login,
  [ROUTES.PRODUCT]: ProductDetail,
  [ROUTES.SIGNUP]: SignUp,
};

routes["404"] = NotFound;

export default routes;
