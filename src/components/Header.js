import { getCookie, logout } from "../services/auth";
import { USER_TYPES, COOKIE_KEYS, ROUTES } from "../constants/constants";
import { getElement } from "../utils/utils";

// 공통 HTML 템플릿 분리
const getBuyerButtons = () => `
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
        <li><a href="#">마이페이지</a></li>
        <li><button class="logout-btn">로그아웃</button></li>
      </ul>
    </div>
  </div>
`;

const getSellerButtons = () => `
  <div class="my-page-btn-wrapper">
    <button class="my-page-btn">
      <span class="img"></span>
      <span class="txt">마이페이지</span>
    </button>
    <div class="list-wrapper">
      <div class="triangle"></div>
      <ul>
        <li><a href="#">마이페이지</a></li>
        <li><button class="logout-btn">로그아웃</button></li>
      </ul>
    </div>
  </div>
  <a href="#" class="primary-btn seller-center-btn">
    <span class="img"></span>
    <span class="txt">판매자 센터</span>
  </a>
`;

const getGuestButtons = () => `
  <a href="#" class="shopping-cart-btn">
    <span class="img"></span>
    <span class="txt">장바구니</span>
  </a>
  <a href="/login" class="login-btn">
    <span class="img"></span>
    <span class="txt">로그인</span>
  </a>
`;

// Header 컴포넌트
const Header = () => {
  const refreshToken = getCookie(COOKIE_KEYS.REFRESH_TOKEN);
  const loginType = getCookie(COOKIE_KEYS.LOGIN_TYPE);

  let userButtons = "";

  if (refreshToken) {
    if (loginType === USER_TYPES.BUYER) {
      userButtons = getBuyerButtons();
    } else if (loginType === USER_TYPES.SELLER) {
      userButtons = getSellerButtons();
    }
  } else {
    userButtons = getGuestButtons();
  }

  return `
    <header id="top-header">
      <nav>
        <section class="logo-search">
          <h1 class="top-logo">
            <a href="/" aria-label="홈페이지로 이동하는 링크">
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
    </header>
  `;
};

// Header 이벤트 설정
export const setHeaderEvent = () => {
  const $myPageBtn = getElement(".my-page-btn");
  if ($myPageBtn) {
    const $dropdown = getElement(".my-page-btn-wrapper .list-wrapper");
    const $logoutBtn = getElement(".my-page-btn-wrapper .logout-btn");

    // 마이페이지 버튼 클릭 이벤트
    $myPageBtn.addEventListener("click", () => {
      $myPageBtn.classList.toggle("on");
      $dropdown.classList.toggle("on");
    });

    // 로그아웃 버튼 클릭 이벤트
    $logoutBtn.addEventListener("click", () => {
      logout();
      window.location.href = ROUTES.HOME;
    });

    // 드롭다운 외부 클릭 감지 이벤트
    document.addEventListener("click", (event) => {
      if (
        !$dropdown.contains(event.target) &&
        !$myPageBtn.contains(event.target)
      ) {
        $myPageBtn.classList.remove("on");
        $dropdown.classList.remove("on");
      }
    });
  }
};

export default Header;
