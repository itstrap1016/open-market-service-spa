import { getCookie, logout } from "../services/auth";

const Header = () => {
  const refreshToken = getCookie("refresh");
  const loginType = getCookie("loginType");

  let userButtons = "";

  if (refreshToken) {
    if (loginType === "BUYER") {
      userButtons = `
        <a href="#" class="shopping-cart-btn">
          <span class="img"></span>
          <span class="txt">장바구니</span>
        </a>
        <div class="my-page-btn-wrapper">
          <button class="my-page-btn">
            <span class="img"></span>
            <span class="txt">마이페이지</span>
          </button>
          <div class="list-wrapper">
            <div class="triangle"></div>
            <ul>
              <li>
                <a href="#">마이페이지</a>
              </li>
              <li>
                <button class="logout-btn">로그아웃</button>
              </li>
            </ul>
          </div>
        </div>
      `;
    } else if (loginType === "SELLER") {
      userButtons = `
        <div class="my-page-btn-wrapper">
          <button class="my-page-btn">
            <span class="img"></span>
            <span class="txt">마이페이지</span>
          </button>
          <div class="list-wrapper">
            <div class="triangle"></div>
            <ul>
              <li>
                <a href="#">마이페이지</a>
              </li>
              <li>
                <button class="logout-btn">로그아웃</button>
              </li>
            </ul>
          </div>
        </div>
        <a href="#" class="primary-btn seller-center-btn">
          <span class="img"></span>
          <span class="txt">판매자 센터</span>
        </a>
      `;
    }
  } else {
    userButtons = `
      <a href="#" class="shopping-cart-btn">
        <span class="img"></span>
        <span class="txt">장바구니</span>
      </a>
      <a href="/login" class="login-btn">
        <span class="img"></span>
        <span class="txt">로그인</span>
      </a>
    `;
  }

  return `<header id="top-header">
      <nav>
        <section class="logo-search">
          <h1 class="top-logo">
            <a href="/" aria-label="홈페이지로 이동하는 링크">
              <img src="/src/assets/img/logo-hodu.png" alt="호두 로고" />
            </a>
          </h1>
          <form action="" class="search-form">
            <h2 class="sr-only">검색창</h2>
            <input type="text" placeholder="상품을 검색해보세요!" />
            <button class="search-btn"></button>
          </form>
        </section>
        <section class="user-btns">
          <h2 class="sr-only">장바구니 버튼 로그인 버튼</h2>
          ${userButtons}
        </section>
      </nav>
    </header>`;
};

export const setHeaderEvent = () => {
  const $myPageBtn = document.querySelector(".my-page-btn");
  if ($myPageBtn) {
    const $dropdown = document.querySelector(
      ".my-page-btn-wrapper .list-wrapper"
    );
    const $logoutBtn = document.querySelector(
      ".my-page-btn-wrapper .list-wrapper .logout-btn"
    );
    $myPageBtn.addEventListener("click", () => {
      $myPageBtn.classList.toggle("on");
      $dropdown.classList.toggle("on");
    });
    $logoutBtn.addEventListener("click", () => {
      logout();
      window.location.href = "/";
    });
    // 드롭다운 외부 클릭 감지 이벤트
    document.addEventListener("click", (event) => {
      if (
        !$dropdown.contains(event.target) &&
        !$myPageBtn.contains(event.target)
      ) {
        // 드롭다운 외부를 클릭한 경우 드롭다운 닫기
        $myPageBtn.classList.remove("on");
        $dropdown.classList.remove("on");
      }
    });
  }
};

export default Header;
