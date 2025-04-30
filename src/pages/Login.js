import FormLogo from "../components/FormLogo";
import LoginForm, { loginSubmit } from "../components/LoginForm";
import TabBtns from "../components/TabBtns";

const Login = () => {
  const observer = new MutationObserver(() => {
    loginSubmit(); // 폼이 렌더링된 후 이벤트 리스너 등록
    observer.disconnect(); // 초기화 후 관찰 중지
  });
  observer.observe(document.getElementById("app"), { childList: true });

  return `
    <section class="login-section">
      ${FormLogo()}
      <div class="common-form-wrap">
        ${TabBtns("구매회원 로그인", "판매회원 로그인")}
        <div class="common-form">
          ${LoginForm()}
        </div>
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
