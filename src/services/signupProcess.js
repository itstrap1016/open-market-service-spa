import { validateUsername } from "../api/signupApi";

export const signupCheckStates = {
  idChecked: false,
};

const errorMessages = {
  required: "필수 정보입니다",
  invalidId: "사용할 수 없는 아이디 입니다",
  invalidPassword:
    "비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.",
  passwordCheckError: "비밀번호가 일치하지 않습니다.",
};

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

export const validateSignup = () => {
  const $idInput = document.querySelector("#user-id");
  const $passwordInput = document.querySelector("#password");
  const $passwordCheckInput = document.querySelector("#password-check");
  const $nameInput = document.querySelector("#name");
  const $idValidateBtn = document.querySelector(".id-validate-btn");
  const $idErrorMessage = document.querySelector(
    ".id-input-set .error-message"
  );
  const $passwordErrorMessage = document.querySelector(
    ".password-input-set .error-message"
  );
  const $passwordCheckErrorMessage = document.querySelector(
    ".password-check-input-set .error-message"
  );
  const $successMessage = document.querySelector(
    ".id-input-set .success-message"
  );
  const $passwordCheckBtn = document.querySelector(
    ".password-input-set .custom-check-btn"
  );
  const $passwordReCheckBtn = document.querySelector(
    ".password-check-input-set .custom-check-btn"
  );
  const $termsCheckbox = document.querySelector(
    ".terms-agreement input[type='checkbox']"
  );
  const $signupBtn = document.querySelector(".signup-btn");
  let isIdChecked = false; // 아이디 중복확인 상태
  let isPasswordConfirmed = false; // 비밀번호 재확인 상태

  const updateSignupButtonState = () => {
    const idValue = $idInput.value.trim();
    const passwordValue = $passwordInput.value.trim();
    const passwordCheckValue = $passwordCheckInput.value.trim();
    const nameValue = $nameInput.value.trim();
    const isTermsChecked = $termsCheckbox.checked;

    // 모든 조건이 만족되면 버튼 활성화
    if (
      idValue &&
      passwordValue &&
      passwordCheckValue &&
      nameValue &&
      isTermsChecked &&
      isIdChecked &&
      isPasswordConfirmed &&
      $passwordCheckBtn.classList.contains("on") &&
      $passwordReCheckBtn.classList.contains("on")
    ) {
      $signupBtn.disabled = false;
    } else {
      $signupBtn.disabled = true;
    }
  };

  $idInput.addEventListener("blur", () => {
    const idValue = $idInput.value.trim();

    if (!idValue) {
      showError($idErrorMessage, errorMessages.required);
    } else {
      hideError($idErrorMessage);
    }

    updateSignupButtonState();
  });

  $idValidateBtn.addEventListener("click", async () => {
    const idValue = $idInput.value.trim();
    const data = await validateUsername(idValue);

    if (!idValue) {
      showError($idErrorMessage, errorMessages.required);
      isIdChecked = false;
    } else if (!data) {
      showError($idErrorMessage, errorMessages.invalidId, $successMessage);
      isIdChecked = false;
    } else if (data) {
      hideError($idErrorMessage, $successMessage);
      isIdChecked = true;
    }

    updateSignupButtonState();
  });

  $passwordInput.addEventListener("click", () => {
    const idValue = $idInput.value.trim();

    if (!idValue) {
      showError($idErrorMessage, errorMessages.required);
    }

    updateSignupButtonState();
  });

  $passwordInput.addEventListener("blur", () => {
    const passwordValue = $passwordInput.value.trim();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordRegex.test(passwordValue)) {
      $passwordCheckBtn.classList.add("on");
      hideError($passwordErrorMessage);
    } else {
      $passwordCheckBtn.classList.remove("on");
      showError($passwordErrorMessage, errorMessages.invalidPassword);
    }

    updateSignupButtonState();
  });

  $passwordCheckInput.addEventListener("click", () => {
    const idValue = $idInput.value.trim();
    const passwordValue = $passwordInput.value.trim();

    if (!idValue) {
      showError($idErrorMessage, errorMessages.required);
    } else if (!passwordValue) {
      showError($passwordErrorMessage, errorMessages.required);
    }

    updateSignupButtonState();
  });

  $passwordCheckInput.addEventListener("blur", () => {
    const passwordValue = $passwordInput.value.trim();
    const passwordCheckValue = $passwordCheckInput.value.trim();
    console.log(passwordCheckValue, passwordValue);

    if (!passwordValue) {
      showError($passwordErrorMessage, errorMessages.required);
      showError($passwordCheckErrorMessage, errorMessages.passwordCheckError);
      isPasswordConfirmed = false;
    } else if (passwordCheckValue !== passwordValue) {
      $passwordReCheckBtn.classList.remove("on");
      showError($passwordCheckErrorMessage, errorMessages.passwordCheckError);
      isPasswordConfirmed = false;
    } else if (passwordCheckValue === passwordValue && passwordValue) {
      $passwordReCheckBtn.classList.add("on");
      hideError($passwordCheckErrorMessage);
      isPasswordConfirmed = true;
    }

    updateSignupButtonState();
  });

  $nameInput.addEventListener("click", () => {
    const idValue = $idInput.value.trim();
    const passwordValue = $passwordInput.value.trim();
    const passwordCheckValue = $passwordCheckInput.value.trim();

    if (!idValue) {
      showError($idErrorMessage, errorMessages.required);
    } else if (!passwordValue) {
      showError($passwordErrorMessage, errorMessages.required);
    } else if (!passwordCheckValue) {
      showError($passwordCheckErrorMessage, errorMessages.required);
    }

    updateSignupButtonState();
  });

  $termsCheckbox.addEventListener("change", () => {
    updateSignupButtonState(); // 버튼 상태 업데이트
  });
};
