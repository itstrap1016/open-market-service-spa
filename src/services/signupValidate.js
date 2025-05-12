import { checkId, checkBusinessNumber } from "../api/signupApi";
import { ERROR_MESSAGES, checkStatus } from "./signupProcess";

// 에러 메시지 처리 함수
const showError = ($errorElement, message, $successElement = null) => {
  $errorElement.classList.remove("off");
  $errorElement.classList.add("on");
  $errorElement.textContent = message;

  if ($successElement) {
    $successElement.classList.remove("on");
  }
};

// 에러 메시지 숨김 함수
const hideError = ($errorElement, $successElement = null) => {
  $errorElement.classList.remove("on");
  $errorElement.classList.add("off");
  $errorElement.textContent = "";

  if ($successElement) {
    $successElement.classList.add("on");
  }
};

export const validateField = ($input, $errorElement, errorMessage) => {
  const value = $input.value.trim();
  if (!value) {
    showError($errorElement, errorMessage);
    return false;
  } else {
    hideError($errorElement);
    return true;
  }
};

export const validateId = async (
  $idInput,
  $idErrorMessage,
  $successMessage
) => {
  const idValue = $idInput.value.trim();
  const data = await checkId(idValue);

  if (data && data.error) {
    showError($idErrorMessage, data.error, $successMessage);
    checkStatus.isIdChecked = false;
  } else if (data && data.message) {
    hideError($idErrorMessage, $successMessage);
    checkStatus.isIdChecked = true;
  }
};

export const validatePassword = (
  $passwordInput,
  $passwordCheckBtn,
  $passwordErrorMessage
) => {
  const passwordValue = $passwordInput.value.trim();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (passwordRegex.test(passwordValue)) {
    $passwordCheckBtn.classList.add("on");
    hideError($passwordErrorMessage);
    return true;
  } else {
    $passwordCheckBtn.classList.remove("on");
    showError($passwordErrorMessage, ERROR_MESSAGES.INVALID_PASSWORD);
    return false;
  }
};

export const validatePasswordMatch = (
  $passwordInput,
  $passwordCheckInput,
  $passwordErrorMessage,
  $passwordCheckErrorMessage,
  $passwordReCheckBtn
) => {
  const passwordValue = $passwordInput.value.trim();
  const passwordCheckValue = $passwordCheckInput.value.trim();

  if (!passwordValue) {
    showError($passwordErrorMessage, ERROR_MESSAGES.REQUIRED);
    showError($passwordCheckErrorMessage, ERROR_MESSAGES.PASSWORD_CHECK_ERROR);
    checkStatus.isPasswordConfirmed = false;
    return false;
  }

  if (passwordCheckValue !== passwordValue) {
    $passwordReCheckBtn.classList.remove("on");
    showError($passwordCheckErrorMessage, ERROR_MESSAGES.PASSWORD_CHECK_ERROR);
    checkStatus.isPasswordConfirmed = false;
    return false;
  }

  if (passwordCheckValue === passwordValue && passwordValue) {
    $passwordReCheckBtn.classList.add("on");
    hideError($passwordCheckErrorMessage);
    checkStatus.isPasswordConfirmed = true;
    return true;
  }
};

export const validateBusinessNumber = async (
  $businessNumberInput,
  $businessErrorMessage,
  $businessSuccessMessage
) => {
  const value = $businessNumberInput.value.trim();
  const data = await checkBusinessNumber(value);

  if (data && data.message) {
    hideError($businessErrorMessage, $businessSuccessMessage);
    checkStatus.isBusinessChecked = true;
    return true;
  } else if (data && data.error) {
    showError($businessErrorMessage, data.error, $businessSuccessMessage);
    checkStatus.isBusinessChecked = false;
    return false;
  }
};
