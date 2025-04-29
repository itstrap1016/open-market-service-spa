const Header = () => {
  // setTimeout(initEvent, 0);

  return `<header id="top-header">
      <nav>
        <section class="logo-search">
          <h1 class="top-logo">
            <a href="#" aria-label="홈페이지로 이동하는 링크">
              <img src="./src/assets/img/logo-hodu.png" alt="호두 로고" />
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
          <a href="#" class="shopping-cart-btn">
            <span class="img"></span>
            <span class="txt">장바구니</span>
          </a>
          <a href="#" class="login-btn">
            <span class="img"></span>
            <span class="txt">로그인</span>
          </a>
        </section>
      </nav>
    </header>`;
};

export const setHeaderEvent = () => {
  const $loginBtn = document.querySelector(".login-btn");
  console.log($loginBtn);
};

export default Header;
