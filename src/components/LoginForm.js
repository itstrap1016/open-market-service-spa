import ErrorMessage from "./ErrorMessage";
import { router } from "../app";
import { loginFetch } from "../api/loginAPi";

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
  let idError = false;
  let passwordError = false;
  let loginError = false;

  const idValue = $idInput.value.trim();
  const passwordValue = $passwordInput.value.trim();
  const response = await loginFetch(idValue, passwordValue);

  // 입력값 검증
  if (!idValue && !passwordValue) {
    error = true;
    errorMessage = "아이디를 입력해 주세요.";
    idError = true;
    passwordError = true;
  } else if (!idValue) {
    error = true;
    errorMessage = "아이디를 입력해 주세요.";
    idError = true;
    passwordError = false;
  } else if (!passwordValue) {
    error = true;
    errorMessage = "비밀번호를 입력해 주세요.";
    idError = false;
    passwordError = true;
  } else if (!response) {
    error = true;
    errorMessage = "아이디 또는 비밀번호가 올바르지 않습니다.";
    loginError = true;
  } else {
    error = false;
    errorMessage = "";
    idError = false;
    passwordError = false;
    loginError = false;

    // / 페이지로 이동
    window.location.href = "/";
    return; // 성공 시 함수 종료
  }

  if (error === true) {
    const prevIdValue = idValue;
    const prevPasswordValue = passwordValue;
    await router();
    $loginBtn = document.querySelector(".login-form .login-btn");
    $loginBtn.classList.add("error");
    const $newIdInput = document.querySelector(".login-form .id-input");
    const $newPasswordInput = document.querySelector(
      ".login-form .password-input"
    );
    if (idError === true && passwordError === true) {
      $newIdInput.focus();
      return;
    }
    if (idError === true && passwordError === false) {
      $newIdInput.focus();
      $newPasswordInput.value = prevPasswordValue;
      return;
    }
    if (idError === false && passwordError === true) {
      $newPasswordInput.focus();
      $newIdInput.value = prevIdValue;
      return;
    }
    if (loginError === true) {
      $newPasswordInput.focus();
      $newIdInput.value = prevIdValue;
      return;
    }
  }
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
