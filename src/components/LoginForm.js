import ErrorMessage from "./ErrorMessage";
import { router } from "../app";

let error = false;
let errorMessage = "";

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

const loginProcess = async () => {
  const $idInput = document.querySelector(".login-form .id-input");
  const $passwordInput = document.querySelector(".login-form .password-input");
  let $loginBtn;

  const idValue = $idInput.value.trim();
  const passwordValue = $passwordInput.value.trim();

  // 입력값 검증
  if (!idValue && !passwordValue) {
    error = true;
    errorMessage = "아이디를 입력해 주세요.";
  } else if (!idValue) {
    error = true;
    errorMessage = "아이디를 입력해 주세요.";
  } else if (!passwordValue) {
    error = true;
    errorMessage = "비밀번호를 입력해 주세요.";
  } else {
    error = false;
    errorMessage = "";
  }

  if (error === true) {
    await router();
    $loginBtn = document.querySelector(".login-form .login-btn");
    $loginBtn.classList.add("error");
    return;
  } else {
  }
  console.log(error, errorMessage);
};

export const loginSubmit = () => {
  const $form = document.querySelector(".login-form");
  const $button = document.querySelector(".login-form .login-btn");
  $form.addEventListener("submit", (e) => {
    loginProcess();
  });
  $button.addEventListener("click", () => {
    loginProcess();
  });
};

export default LoginForm;
