import {
  checkId,
  checkBusinessNumber,
  buyerSignup,
  sellerSignup,
} from "../api/signupApi";
import { getElement } from "../utils/utils";
import { USER_TYPES } from "../constants/constants";

const ERROR_MESSAGES = {
  REQUIRED: "필수 정보입니다",
  INVALID_PASSWORD:
    "비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.",
  PASSWORD_CHECK_ERROR: "비밀번호가 일치하지 않습니다.",
};

const checkStatus = {
  isIdChecked: false, // 아이디 중복확인 상태
  isPasswordConfirmed: false, // 비밀번호 재확인 상태
  isBusinessChecked: true,
};

const getInputDoms = () => {
  return {
    $idInput: getElement("#user-id"),
    $passwordInput: getElement("#password"),
    $passwordCheckInput: getElement("#password-check"),
    $nameInput: getElement("#name"),
    $businessNumberInput: getElement("#business-number"),
    $storeNameInput: getElement("#store-name"),
    $phoneNumberSelect: getElement("#phone-number-select"),
    $phoneNumberInput1: getElement(".number-input-01"),
    $phoneNumberInput2: getElement(".number-input-02"),
  };
};

const getButtonDoms = () => {
  return {
    $idValidateBtn: getElement(".id-validate-btn"),
    $businessValidateBtn: getElement(".business-number-validate-btn"),
    $passwordCheckBtn: getElement(".password-input-set .custom-check-btn"),
    $passwordReCheckBtn: getElement(
      ".password-check-input-set .custom-check-btn"
    ),
    $termsCheckbox: getElement(".terms-agreement input[type='checkbox']"),
    $signupBtn: getElement(".signup-btn"),
  };
};

const getMessageDoms = () => {
  return {
    $idErrorMessage: getElement(".id-input-set .error-message"),
    $passwordErrorMessage: getElement(".password-input-set .error-message"),
    $passwordCheckErrorMessage: getElement(
      ".password-check-input-set .error-message"
    ),
    $nameErrorMessage: getElement(".name-input-set .error-message"),
    $phoneErrorMessage: getElement(".phone-number-set .error-message"),
    $businessErrorMessage: getElement(".business-number-set .error-message"),
    $storeErrorMessage: getElement(".store-name-set .error-message"),
    $successMessage: getElement(".id-input-set .success-message"),
    $businessSuccessMessage: getElement(
      ".business-number-set .success-message"
    ),
  };
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

const updateSignupBtnState = () => {
  const {
    $idInput,
    $passwordInput,
    $passwordCheckInput,
    $nameInput,
    $businessNumberInput,
    $storeNameInput,
  } = getInputDoms();
  const { $signupBtn, $passwordCheckBtn, $passwordReCheckBtn, $termsCheckbox } =
    getButtonDoms();

  const idValue = $idInput.value.trim();
  const passwordValue = $passwordInput.value.trim();
  const passwordCheckValue = $passwordCheckInput.value.trim();
  const nameValue = $nameInput.value.trim();
  const isTermsChecked = $termsCheckbox.checked;

  const businessNumberValue = $businessNumberInput
    ? $businessNumberInput.value.trim()
    : true; // 구매회원가입일 경우 true로 처리
  const storeNameValue = $storeNameInput ? $storeNameInput.value.trim() : true; // 구매회원가입일 경우 true로 처리

  // 모든 조건이 만족되면 버튼 활성화
  if (
    idValue &&
    passwordValue &&
    passwordCheckValue &&
    nameValue &&
    isTermsChecked &&
    checkStatus.isIdChecked &&
    checkStatus.isPasswordConfirmed &&
    checkStatus.isBusinessChecked &&
    $passwordCheckBtn.classList.contains("on") &&
    $passwordReCheckBtn.classList.contains("on") &&
    businessNumberValue &&
    storeNameValue
  ) {
    $signupBtn.disabled = false;
  } else {
    $signupBtn.disabled = true;
  }
};

const setSignupBtnState = () => {
  const $signupForm = getElement(".signup-form");
  const { $termsCheckbox } = getButtonDoms();
  const formElements = $signupForm.querySelectorAll("button, input, select");
  formElements.forEach((element) => {
    // 클릭 이벤트
    element.addEventListener("click", () => {
      updateSignupBtnState();
    });

    // focus를 잃었을 때 (blur 이벤트)
    element.addEventListener("blur", () => {
      updateSignupBtnState();
    });
  });
  $termsCheckbox.addEventListener("change", () => {
    updateSignupBtnState(); // 버튼 상태 업데이트
  });
};

const validateField = ($input, $errorElement, errorMessage) => {
  const value = $input.value.trim();
  if (!value) {
    showError($errorElement, errorMessage);
    return false;
  } else {
    hideError($errorElement);
    return true;
  }
};

const validateId = async ($idInput, $idErrorMessage, $successMessage) => {
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

const validatePassword = (
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

const validatePasswordMatch = (
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

const validateBusinessNumber = async (
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

export const validateSignup = () => {
  const {
    $idInput,
    $passwordInput,
    $passwordCheckInput,
    $nameInput,
    $businessNumberInput,
    $storeNameInput,
    $phoneNumberInput1,
    $phoneNumberInput2,
  } = getInputDoms();
  const {
    $idValidateBtn,
    $businessValidateBtn,
    $passwordCheckBtn,
    $passwordReCheckBtn,
  } = getButtonDoms();
  const {
    $idErrorMessage,
    $passwordErrorMessage,
    $passwordCheckErrorMessage,
    $nameErrorMessage,
    $phoneErrorMessage,
    $businessErrorMessage,
    $successMessage,
    $businessSuccessMessage,
    $storeErrorMessage,
  } = getMessageDoms();

  setSignupBtnState();

  $idInput.addEventListener("blur", () => {
    validateField($idInput, $idErrorMessage, ERROR_MESSAGES.REQUIRED);
  });

  $idValidateBtn.addEventListener("click", async () => {
    await validateId($idInput, $idErrorMessage, $successMessage);
  });

  $passwordInput.addEventListener("click", () => {
    validateField($idInput, $idErrorMessage, ERROR_MESSAGES.REQUIRED);
  });

  $passwordInput.addEventListener("blur", () => {
    validatePassword($passwordInput, $passwordCheckBtn, $passwordErrorMessage);
  });

  $passwordCheckInput.addEventListener("click", () => {
    validateField($idInput, $idErrorMessage, ERROR_MESSAGES.REQUIRED);
    validateField(
      $passwordInput,
      $passwordErrorMessage,
      ERROR_MESSAGES.REQUIRED
    );
  });

  $passwordCheckInput.addEventListener("blur", () => {
    validatePasswordMatch(
      $passwordInput,
      $passwordCheckInput,
      $passwordErrorMessage,
      $passwordCheckErrorMessage,
      $passwordReCheckBtn
    );
  });

  $nameInput.addEventListener("click", () => {
    validateField($idInput, $idErrorMessage, ERROR_MESSAGES.REQUIRED);
    validateField(
      $passwordInput,
      $passwordErrorMessage,
      ERROR_MESSAGES.REQUIRED
    );
    validateField(
      $passwordCheckInput,
      $passwordCheckErrorMessage,
      ERROR_MESSAGES.REQUIRED
    );
  });

  $nameInput.addEventListener("blur", () => {
    validateField($nameInput, $nameErrorMessage, ERROR_MESSAGES.REQUIRED);
  });

  $phoneNumberInput1.addEventListener("click", () => {
    validateField($idInput, $idErrorMessage, ERROR_MESSAGES.REQUIRED);
    validateField(
      $passwordInput,
      $passwordErrorMessage,
      ERROR_MESSAGES.REQUIRED
    );
    validateField(
      $passwordCheckInput,
      $passwordCheckErrorMessage,
      ERROR_MESSAGES.REQUIRED
    );
    validateField($nameInput, $nameErrorMessage, ERROR_MESSAGES.REQUIRED);
  });

  $phoneNumberInput1.addEventListener("blur", () => {
    validateField(
      $phoneNumberInput1,
      $phoneErrorMessage,
      ERROR_MESSAGES.REQUIRED
    );
    validateField(
      $phoneNumberInput2,
      $phoneErrorMessage,
      ERROR_MESSAGES.REQUIRED
    );
  });

  $phoneNumberInput2.addEventListener("blur", () => {
    validateField(
      $phoneNumberInput1,
      $phoneErrorMessage,
      ERROR_MESSAGES.REQUIRED
    );
    validateField(
      $phoneNumberInput2,
      $phoneErrorMessage,
      ERROR_MESSAGES.REQUIRED
    );
  });

  if ($businessNumberInput && $storeNameInput) {
    $businessValidateBtn.addEventListener("click", async () => {
      await validateBusinessNumber(
        $businessNumberInput,
        $businessErrorMessage,
        $businessSuccessMessage
      );
    });

    $businessNumberInput.addEventListener("click", () => {
      validateField($idInput, $idErrorMessage, ERROR_MESSAGES.REQUIRED);
      validateField(
        $passwordInput,
        $passwordErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
      validateField(
        $passwordCheckInput,
        $passwordCheckErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
      validateField($nameInput, $nameErrorMessage, ERROR_MESSAGES.REQUIRED);
      validateField(
        $phoneNumberInput1,
        $phoneErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
      validateField(
        $phoneNumberInput2,
        $phoneErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
    });

    $businessNumberInput.addEventListener("blur", () => {
      validateField(
        $businessNumberInput,
        $businessErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
    });

    $storeNameInput.addEventListener("click", () => {
      validateField($idInput, $idErrorMessage, ERROR_MESSAGES.REQUIRED);
      validateField(
        $passwordInput,
        $passwordErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
      validateField(
        $passwordCheckInput,
        $passwordCheckErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
      validateField($nameInput, $nameErrorMessage, ERROR_MESSAGES.REQUIRED);
      validateField(
        $phoneNumberInput1,
        $phoneErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
      validateField(
        $phoneNumberInput2,
        $phoneErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
      validateField(
        $businessNumberInput,
        $businessErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
    });

    $storeNameInput.addEventListener("blur", () => {
      validateField(
        $storeNameInput,
        $storeErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
    });
  }
};

export const handleSignup = async () => {
  // DOM 가져오기
  const {
    $idInput,
    $passwordInput,
    $nameInput,
    $businessNumberInput,
    $storeNameInput,
    $phoneNumberInput1,
    $phoneNumberInput2,
    $phoneNumberSelect,
  } = getInputDoms();

  const $activeTab = getElement(".tab-btn.active"); // 활성화된 탭
  const signupType = $activeTab ? $activeTab.dataset.signupType : null; // 탭의 데이터 속성으로 타입 확인

  // 입력값 가져오기
  const username = $idInput.value.trim();
  const password = $passwordInput.value.trim();
  const name = $nameInput.value.trim();
  const phone_number = `${
    $phoneNumberSelect.value
  }${$phoneNumberInput1.value.trim()}${$phoneNumberInput2.value.trim()}`;
  const business_number = $businessNumberInput
    ? $businessNumberInput.value.trim()
    : null;
  const store_name = $storeNameInput ? $storeNameInput.value.trim() : null;

  // 입력값 검증
  if (!username || !password || !name || !phone_number) {
    alert("모든 필드를 입력해 주세요.");
    return;
  }

  try {
    let response;

    // 구매자 회원가입
    if (signupType === USER_TYPES.BUYER) {
      response = await buyerSignup({ username, password, name, phone_number });
    }
    // 판매자 회원가입
    else if (signupType === USER_TYPES.SELLER) {
      // 판매자 회원가입 API 호출
      response = await sellerSignup({
        username,
        password,
        name,
        phone_number,
        company_registration_number: business_number,
        store_name,
      });
    }
    // 성공 처리
    if (response) {
      alert("회원가입이 성공적으로 완료되었습니다!");
      window.location.href = "/login"; // 회원가입 후 로그인 페이지로 이동
    } else {
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  } catch (error) {
    console.error("회원가입 중 에러 발생:", error);
    alert("회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.");
  }
};
