import ErrorMessage from "./ErrorMessage";
import { loginProcess, error, errorMessage } from "../services/loginProcess";

const LoginForm = () => {
  return `
    <form class="login-form">
        <input type="text" class="login-input id-input" placeholder="아이디" name="id" required/>
        <input type="password" class="login-input password-input" placeholder="비밀번호" name="password" autocomplete="current=password" required/>
        ${error ? ErrorMessage(errorMessage) : ""}
        <button type="submit" class="primary-btn login-btn">로그인</button>
    </form>
    `;
};

export const loginSubmit = () => {
  const $form = document.querySelector(".login-form");
  const $button = document.querySelector(".login-form .login-btn");
  $form.addEventListener("submit", () => {
    loginProcess();
  });
  $button.addEventListener("click", () => {
    loginProcess();
  });
};

export default LoginForm;
