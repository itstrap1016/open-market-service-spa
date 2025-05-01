import routes from "./routes.js";

export const router = async () => {
  const path = window.location.pathname;
  const render = routes[path] || routes["404"];
  const html = await render();
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.insertAdjacentHTML("afterbegin", html);
};

// 브라우저 처음 로드되었을 때
window.addEventListener("DOMContentLoaded", () => {
  router();

  // 클릭 이벤트 처리
  document.addEventListener("click", (e) => {
    const target = e.target.closest("a, button"); // a 또는 button 태그 확인

    if (!target) return;

    if (target) {
      e.preventDefault(); // 기본 동작 방지
    }
    if (target.tagName === "A") {
      const href = target.getAttribute("href"); // href 속성 가져오기
      if (href && href !== window.location.pathname && href !== "#") {
        history.pushState(null, null, href); // URL 변경
        router(); // 라우터 함수 호출
      }
    }
  });

  // 폼 제출 이벤트 처리
  document.addEventListener("submit", (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    console.log("Form submission prevented.");
  });
});

// 브라우저 앞으로/뒤로가기 했을 때
window.addEventListener("popstate", router);
