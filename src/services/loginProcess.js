import { router } from "../app";
import { loginFetch } from "../api/loginAPi";

export let error = false;
export let errorMessage = "";

export const loginProcess = async () => {
  const $idInput = document.querySelector(".login-form .id-input");
  const $passwordInput = document.querySelector(".login-form .password-input");
  let idError = false;
  let passwordError = false;
  let loginError = false;

  const loginType = document.querySelector(".tab-btn.active").dataset.loginType;

  const idValue = $idInput.value.trim();
  const passwordValue = $passwordInput.value.trim();
  const data = await loginFetch(idValue, passwordValue);

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
  } else if (!passwordValue) {
    error = true;
    errorMessage = "비밀번호를 입력해 주세요.";
    passwordError = true;
  } else if (!data) {
    error = true;
    errorMessage = "아이디 또는 비밀번호가 올바르지 않습니다.";
    loginError = true;
  } else if (data && data.user["user_type"] !== loginType) {
    error = true;
    errorMessage = "아이디 또는 비밀번호가 올바르지 않습니다.";
    loginError = true;
  }

  // 에러 처리
  if (error === true) {
    await router();
    const buttons = document.querySelectorAll(".tab-btn");

    // 렌더링 후 loginType에 따라 active 상태 복원
    buttons.forEach((button) => {
      if (button.dataset.loginType === loginType) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    const $loginBtn = document.querySelector(".login-form .login-btn");
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
      $newPasswordInput.value = passwordValue;
      return;
    }
    if ((idError === false && passwordError === true) || loginError === true) {
      $newPasswordInput.focus();
      $newIdInput.value = idValue;
      return;
    }
    // if (loginError === true) {
    //   $newPasswordInput.focus();
    //   $newIdInput.value = idValue;
    //   return;
    // }
  }

  if (data && data.access && data.refresh) {
    console.log("로그인 성공");

    // 환경에 따라 Secure 옵션 설정
    const isProduction = window.location.hostname !== "localhost";

    // Access Token 저장 (5분 유효)
    document.cookie = `access=${data.access}; path=/; max-age=300; ${
      isProduction ? "Secure;" : ""
    } SameSite=Strict`;

    // Refresh Token 저장 (1일 유효)
    document.cookie = `refresh=${data.refresh}; path=/; max-age=86400; ${
      isProduction ? "Secure;" : ""
    } SameSite=Strict`;

    // loginType 저장 (1일 유효)
    document.cookie = `loginType=${loginType}; path=/; max-age=86400; ${
      isProduction ? "Secure;" : ""
    } SameSite=Strict`;

    // 페이지로 이동
    window.location.href = "/";
    return;
  }
};
