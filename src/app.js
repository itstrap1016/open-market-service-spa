import routes from "./routes.js";

const router = async () => {
  const path = window.location.pathname;
  const render = routes[path];
  const html = await render();
  const app = document.getElementById("app");
  app.insertAdjacentHTML("afterbegin", html);
};

// 브라우저 처음 로드되었을 때
window.addEventListener("DOMContentLoaded", () => {
  router();
});
// 브라우저 앞으로/뒤로가기 했을 때
window.addEventListener("popstate", router);
