import { loginFetch } from "../api/loginAPi";

const errorMessage = {
  idRequired: "아이디를 입력해 주세요.",
  passwordRequired: "비밀번호를 입력해 주세요.",
  loginError: "아이디 또는 비밀번호 올바르지 않습니다.",
};

// 에러 메시지 처리 함수
const showError = (
  $errorElement,
  message,
  $focusElement,
  $buttonElement = null
) => {
  $errorElement.textContent = message;
  $errorElement.classList.add("on");

  if ($buttonElement) {
    $buttonElement.classList.add("error");
  }

  if ($focusElement) {
    $focusElement.focus();
  }
};

// 에러 메시지 숨김 함수
const hideError = ($errorElement, $buttonElement = null) => {
  $errorElement.textContent = "";
  $errorElement.classList.remove("on");

  if ($buttonElement) {
    $buttonElement.classList.remove("error");
  }
};

export const loginProcess = async () => {
  const $idInput = document.querySelector(".login-form .id-input");
  const $passwordInput = document.querySelector(".login-form .password-input");
  const $errorMessage = document.querySelector(".login-form .error-message");
  const $loginBtn = document.querySelector(".login-form .login-btn");
  const loginType = document.querySelector(".tab-btn.active").dataset.loginType;

  const idValue = $idInput.value.trim();
  const passwordValue = $passwordInput.value.trim();
  const data = await loginFetch(idValue, passwordValue);

  // 입력값 검증
  if (!idValue && !passwordValue) {
    showError($errorMessage, errorMessage.idRequired, $idInput, $loginBtn);
    return;
  } else if (!idValue) {
    showError($errorMessage, errorMessage.idRequired, $idInput, $loginBtn);
    return;
  } else if (!passwordValue) {
    showError(
      $errorMessage,
      errorMessage.passwordRequired,
      $passwordInput,
      $loginBtn
    );
    return;
  } else if (!data) {
    showError(
      $errorMessage,
      errorMessage.loginError,
      $passwordInput,
      $loginBtn
    );
    return;
  } else if (data && data.user["user_type"] !== loginType) {
    showError(
      $errorMessage,
      errorMessage.loginError,
      $passwordInput,
      $loginBtn
    );
    return;
  }

  if (data && data.access && data.refresh) {
    console.log("로그인 성공");
    hideError($errorMessage, $loginBtn);

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
