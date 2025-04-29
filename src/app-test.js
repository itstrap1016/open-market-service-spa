// app.js

// 컴포넌트: Home
function Home() {
  return `<h1>Home Page</h1>`;
}

// 컴포넌트: About
function About() {
  return `<h1>About Page</h1>`;
}

// 공통 Nav 컴포넌트
function Nav() {
  return `
      <nav>
        <a href="/" onclick="navigate(event, '/')">Home</a>
        <a href="/about" onclick="navigate(event, '/about')">About</a>
      </nav>
    `;
}

// 경로별로 어떤 컴포넌트를 보여줄지 매핑
const routes = {
  "/": Home,
  "/about": About,
};

// 현재 경로에 맞는 컴포넌트를 렌더링하는 함수
function router() {
  const path = window.location.pathname;
  const render = routes[path] || NotFound;
  document.getElementById("app").innerHTML = `
      ${Nav()}
      ${render()}
    `;
}

// 없는 경로일 때 보여줄 컴포넌트
function NotFound() {
  return `<h1>404 - Page Not Found</h1>`;
}

// 링크 클릭 시 URL 변경하고 렌더링하는 함수
function navigate(event, path) {
  event.preventDefault();
  window.history.pushState({}, "", path);
  router();
}

// 브라우저 처음 로드되었을 때
window.addEventListener("DOMContentLoaded", router);

// 브라우저 앞으로/뒤로가기 했을 때
window.addEventListener("popstate", router);
