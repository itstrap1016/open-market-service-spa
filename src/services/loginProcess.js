import { router } from "../app";
import { loginFetch } from "../api/loginAPi";

export let error = false;
export let errorMessage = "";

export const loginProcess = async () => {
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
