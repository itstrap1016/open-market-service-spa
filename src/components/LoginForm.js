import ErrorMessage from "./ErrorMessage";
import { loginProcess } from "../services/loginProcess";
import { getElement } from "../utils/utils";

const LoginForm = () => {
  return `
    <form class="login-form">
        <input type="text" class="login-input id-input" placeholder="아이디" name="id" required/>
        <input type="password" class="login-input password-input" placeholder="비밀번호" name="password" autocomplete="current=password" required/>
        ${ErrorMessage("")}
        <button type="submit" class="primary-btn login-btn">로그인</button>
    </form>
    `;
};

export const loginSubmit = () => {
  const $form = getElement(".login-form");
  const $button = getElement(".login-form .login-btn");
  $form.addEventListener("submit", () => {
    loginProcess();
  });
  $button.addEventListener("click", () => {
    loginProcess();
  });
};

export default LoginForm;
