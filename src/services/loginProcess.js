import { loginFetch } from "../api/loginAPi";
import { getElement } from "../utils/utils";

const COOKIE_OPTIONS = "path=/; max-age=86400; Secure; SameSite=Strict";

const ERROR_MESSAGES = {
  ID_REQUIRED: "아이디를 입력해 주세요.",
  PASSWORD_REQUIRED: "비밀번호를 입력해 주세요.",
  LOGIN_ERROR: "아이디 또는 비밀번호 올바르지 않습니다.",
};

const setCookie = (name, value, options) => {
  document.cookie = `${name}=${value}; ${options}`;
};

// 에러 메시지 처리 함수
const showError = (
  $errorElement,
  message,
  $focusElement = null,
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

const validateInputs = (
  idValue,
  passwordValue,
  $idInput,
  $passwordInput,
  $errorMessage,
  $loginBtn
) => {
  if (!idValue && !passwordValue) {
    showError($errorMessage, ERROR_MESSAGES.ID_REQUIRED, $idInput, $loginBtn);
    return false;
  }

  if (!idValue) {
    showError($errorMessage, ERROR_MESSAGES.ID_REQUIRED, $idInput, $loginBtn);
    return false;
  }

  if (!passwordValue) {
    showError(
      $errorMessage,
      ERROR_MESSAGES.PASSWORD_REQUIRED,
      $passwordInput,
      $loginBtn
    );
    return false;
  }

  return true;
};

const handleSuccessfulLogin = (data, loginType) => {
  // 쿠키 저장
  setCookie("refreshToken", data.refresh, COOKIE_OPTIONS);
  setCookie("loginType", loginType, COOKIE_OPTIONS);
  setCookie("userName", data.user.name, COOKIE_OPTIONS);

  // 페이지로 이동
  window.location.href = "/";
};

export const loginProcess = async () => {
  const $idInput = getElement(".login-form .id-input");
  const $passwordInput = getElement(".login-form .password-input");
  const $errorMessage = getElement(".login-form .error-message");
  const $loginBtn = getElement(".login-form .login-btn");
  const loginType = getElement(".tab-btn.active")?.dataset.loginType;

  const idValue = $idInput.value.trim();
  const passwordValue = $passwordInput.value.trim();

  // 입력값 검증
  if (
    !validateInputs(
      idValue,
      passwordValue,
      $idInput,
      $passwordInput,
      $errorMessage,
      $loginBtn
    )
  ) {
    return;
  }

  try {
    const data = await loginFetch(idValue, passwordValue);

    if (!data || data.user["user_type"] !== loginType) {
      showError(
        $errorMessage,
        ERROR_MESSAGES.LOGIN_ERROR,
        $passwordInput,
        $loginBtn
      );
      return;
    }

    if (data.access && data.refresh) {
      handleSuccessfulLogin(data, loginType);
    }
  } catch (error) {
    console.error("로그인 중 에러 발생:", error);
    showError(
      $errorMessage,
      ERROR_MESSAGES.LOGIN_ERROR,
      $passwordInput,
      $loginBtn
    );
  }
};
