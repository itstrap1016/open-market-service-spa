import { buyerSignup, sellerSignup } from "../api/signupApi";
import { getElement } from "../utils/utils";
import { USER_TYPES, ROUTES } from "../constants/constants";
import { getInputDoms, getButtonDoms, getMessageDoms } from "./getSignupDoms";
import {
  validateField,
  validateId,
  validatePassword,
  validatePasswordMatch,
  validateBusinessNumber,
} from "./signupValidate";

export const ERROR_MESSAGES = {
  REQUIRED: "필수 정보입니다",
  INVALID_PASSWORD:
    "비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.",
  PASSWORD_CHECK_ERROR: "비밀번호가 일치하지 않습니다.",
};

export const checkStatus = {
  isIdChecked: false, // 아이디 중복확인 상태
  isPasswordConfirmed: false, // 비밀번호 재확인 상태
  isBusinessChecked: true,
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

  const $signupForm = getElement(".signup-form");

  $signupForm.addEventListener(
    "blur",
    (event) => {
      const target = event.target;

      // ID 입력 필드 검증
      if (target === $idInput) {
        validateField($idInput, $idErrorMessage, ERROR_MESSAGES.REQUIRED);
      }
      // 비밀번호 입력 필드 검증
      if (target === $passwordInput) {
        validatePassword(
          $passwordInput,
          $passwordCheckBtn,
          $passwordErrorMessage
        );
      }
      // 비밀번호 확인 필드 검증
      if (target === $passwordCheckInput) {
        validatePasswordMatch(
          $passwordInput,
          $passwordCheckInput,
          $passwordErrorMessage,
          $passwordCheckErrorMessage,
          $passwordReCheckBtn
        );
      }
      // 이름 입력 필드 검증
      if (target === $nameInput) {
        validateField($nameInput, $nameErrorMessage, ERROR_MESSAGES.REQUIRED);
      }
      // 전화번호 입력 필드 검증
      if (target === $phoneNumberInput1 || target === $phoneNumberInput2) {
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
      }
      // 사업자 번호 입력 필드 검증
      if (target === $businessNumberInput) {
        validateField(
          $businessNumberInput,
          $businessErrorMessage,
          ERROR_MESSAGES.REQUIRED
        );
      }
      // 상점 이름 입력 필드 검증
      if (target === $storeNameInput) {
        validateField(
          $storeNameInput,
          $storeErrorMessage,
          ERROR_MESSAGES.REQUIRED
        );
      }
    },
    true
  );

  $signupForm.addEventListener("click", async (event) => {
    const target = event.target;

    // ID 중복 확인 버튼
    if (target === $idValidateBtn) {
      await validateId($idInput, $idErrorMessage, $successMessage);
    }

    // 비밀번호 입력 필드 클릭
    if (target === $passwordInput) {
      validateField($idInput, $idErrorMessage, ERROR_MESSAGES.REQUIRED);
    }

    // 비밀번호 확인 필드 클릭
    if (target === $passwordCheckInput) {
      validateField($idInput, $idErrorMessage, ERROR_MESSAGES.REQUIRED);
      validateField(
        $passwordInput,
        $passwordErrorMessage,
        ERROR_MESSAGES.REQUIRED
      );
    }

    // 이름 입력 필드 클릭
    if (target === $nameInput) {
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
    }

    // 전화번호 입력 필드 클릭
    if (target === $phoneNumberInput1 || target === $phoneNumberInput2) {
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
    }

    // 사업자 번호 확인 버튼
    if (target === $businessValidateBtn) {
      await validateBusinessNumber(
        $businessNumberInput,
        $businessErrorMessage,
        $businessSuccessMessage
      );
    }

    // 사업자 번호 입력 필드 클릭
    if (target === $businessNumberInput) {
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
    }

    // 상점 이름 입력 필드 클릭
    if (target === $storeNameInput) {
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
    }
  });
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

  const $activeTab = getElement(".tab-btn.active");
  const signupType = $activeTab ? $activeTab.dataset.signupType : null;

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
    if (response.success) {
      alert("회원가입이 성공적으로 완료되었습니다!");
      window.location.href = ROUTES.LOGIN; // 회원가입 후 로그인 페이지로 이동
    } else {
      // 실패 처리: 에러 메시지 출력
      const errorMessages = Object.entries(response.errorData)
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join("\n"); // 에러 메시지를 필드별로 줄바꿈 처리
      alert(`회원가입에 실패했습니다:\n${errorMessages}`);
    }
  } catch (error) {
    console.error("회원가입 중 에러 발생:", error);
    alert("회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.");
  }
};
