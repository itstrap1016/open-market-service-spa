const Login = () => {
  return `
    <section class="login-section">
      <h1 class="logo">
        <a href="/" aria-label="홈페이지로 이동하는 링크">
          <img src="/src/assets/img/logo-hodu.png" alt="호두 로고" />
        </a>
      </h1>
      <div class="common-tab">
        <ul class="btns-list">
          <li>
            <button class="active">구매회원 로그인</button>
          </li>
          <li>
            <button>판매회원 로그인</button>
          </li>
        </ul>
        <form class="login-form">
          <input type="text" class="login-input" placeholder="아이디" name="id" />
          <input type="password" class="login-input" placeholder="비밀번호" name="password" />
          <button class="primary-btn">로그인</button>
        </form>
      </div>
      <ul class="links-list">
        <li>
          <a href="#">회원가입</a>
        </li>
         <li>
          <a href="#">비밀번호 찾기</a>
        </li>
      </ul>
    </section>
  `;
};

export default Login;
