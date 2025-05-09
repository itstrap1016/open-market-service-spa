import routes from "./routes.js";
import { getCookie } from "./services/auth.js";
import { ROUTES, COOKIE_KEYS } from "./constants/constants";

// DOM 업데이트 함수
const updateDOM = (html) => {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.insertAdjacentHTML("afterbegin", html);
};

// 로그인 경로 처리 함수
const handleLoginRedirect = () => {
  const refreshToken = getCookie(COOKIE_KEYS.REFRESH_TOKEN);
  if (refreshToken) {
    alert("이미 로그인된 사용자입니다. 메인 페이지로 이동합니다.");
    window.location.href = ROUTES.HOME;
    return true;
  }
  return false;
};

// 동적 경로 처리 함수
const handleDynamicRoute = async (path) => {
  const dynamicMatch = path.match(/^\/product\/(\d+)$/);
  if (dynamicMatch) {
    const productId = dynamicMatch[1];
    const render = routes[ROUTES.PRODUCT];
    const html = await render(productId);
    updateDOM(html);
    return true;
  }
  return false;
};

// 라우터 함수
export const router = async () => {
  const path = window.location.pathname;

  // 로그인 경로 처리
  if (path === ROUTES.LOGIN && handleLoginRedirect()) return;

  // 동적 경로 처리
  if (await handleDynamicRoute(path)) return;

  // 정적 경로 처리
  const render = routes[path] || routes[ROUTES.NOT_FOUND];
  const html = await render();
  updateDOM(html);
};

// 링크 클릭 이벤트 처리 함수
const handleLinkClick = (e) => {
  const target = e.target.closest("a, button");
  if (!target) return;

  if (target.tagName === "A") {
    const href = target.getAttribute("href");
    if (href && href !== window.location.pathname && href !== "#") {
      e.preventDefault();
      history.pushState(null, null, href);
      router();
    }
  }
};

// 폼 제출 이벤트 처리 함수
const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log("Form submission prevented.");
};

// 초기화 함수
const initializeApp = () => {
  // 브라우저 처음 로드되었을 때
  window.addEventListener("DOMContentLoaded", () => {
    router();

    // 클릭 이벤트 처리
    document.addEventListener("click", handleLinkClick);

    // 폼 제출 이벤트 처리
    document.addEventListener("submit", handleFormSubmit);
  });

  // 브라우저 앞으로/뒤로가기 했을 때
  window.addEventListener("popstate", router);
};

// 앱 초기화 실행
initializeApp();
