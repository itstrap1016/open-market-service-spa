import { validateUsername } from "../api/signupApi";
import { buyerSignup } from "../api/signupApi";

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

let isIdChecked = false; // 아이디 중복확인 상태
let isPasswordConfirmed = false; // 비밀번호 재확인 상태

const updateSignupBtnState = () => {
  const $idInput = document.querySelector("#user-id");
  const $passwordInput = document.querySelector("#password");
  const $passwordCheckInput = document.querySelector("#password-check");
  const $nameInput = document.querySelector("#name");
  const $signupBtn = document.querySelector(".signup-btn");
  const $passwordCheckBtn = document.querySelector(
    ".password-input-set .custom-check-btn"
  );
  const $passwordReCheckBtn = document.querySelector(
    ".password-check-input-set .custom-check-btn"
  );
  const $termsCheckbox = document.querySelector(
    ".terms-agreement input[type='checkbox']"
  );
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

export const validateSignup = () => {
  const $signupForm = document.querySelector(".signup-form");
  const $idInput = document.querySelector("#user-id");
  const $passwordInput = document.querySelector("#password");
  const $passwordCheckInput = document.querySelector("#password-check");
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

  // signup-form 내 모든 input과 select 요소에 이벤트 추가
  const formElements = $signupForm.querySelectorAll("input, select");

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

  $idInput.addEventListener("blur", () => {
    const idValue = $idInput.value.trim();

    if (!idValue) {
      showError($idErrorMessage, errorMessages.required);
    } else {
      hideError($idErrorMessage);
    }
  });

  $idValidateBtn.addEventListener("click", async () => {
    const idValue = $idInput.value.trim();
    const data = await validateUsername(idValue);

    if (!idValue) {
      showError($idErrorMessage, errorMessages.required);
      isIdChecked = false;
    }
    if (!data) {
      showError($idErrorMessage, errorMessages.invalidId, $successMessage);
      isIdChecked = false;
    }
    if (data) {
      hideError($idErrorMessage, $successMessage);
      isIdChecked = true;
    }
  });

  $passwordInput.addEventListener("click", () => {
    const idValue = $idInput.value.trim();

    if (!idValue) {
      showError($idErrorMessage, errorMessages.required);
    }
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
  });

  $passwordCheckInput.addEventListener("click", () => {
    const idValue = $idInput.value.trim();
    const passwordValue = $passwordInput.value.trim();

    if (!idValue) {
      showError($idErrorMessage, errorMessages.required);
    }
    if (!passwordValue) {
      showError($passwordErrorMessage, errorMessages.required);
    }
  });

  $passwordCheckInput.addEventListener("blur", () => {
    const passwordValue = $passwordInput.value.trim();
    const passwordCheckValue = $passwordCheckInput.value.trim();

    if (!passwordValue) {
      showError($passwordErrorMessage, errorMessages.required);
      showError($passwordCheckErrorMessage, errorMessages.passwordCheckError);
      isPasswordConfirmed = false;
    }
    if (passwordCheckValue !== passwordValue) {
      $passwordReCheckBtn.classList.remove("on");
      showError($passwordCheckErrorMessage, errorMessages.passwordCheckError);
      isPasswordConfirmed = false;
    }
    if (passwordCheckValue === passwordValue && passwordValue) {
      $passwordReCheckBtn.classList.add("on");
      hideError($passwordCheckErrorMessage);
      isPasswordConfirmed = true;
    }
  });

  $termsCheckbox.addEventListener("change", () => {
    updateSignupBtnState(); // 버튼 상태 업데이트
  });
};

export const handleSignup = async () => {
  const $idInput = document.querySelector("#user-id");
  const $passwordInput = document.querySelector("#password");
  const $nameInput = document.querySelector("#name");
  const $phoneNumberSelect = document.querySelector("#phone-number-select");
  const $phoneNumberInput1 = document.querySelector(".number-input-01");
  const $phoneNumberInput2 = document.querySelector(".number-input-02");

  // 입력값 가져오기
  const username = $idInput.value.trim();
  const password = $passwordInput.value.trim();
  const name = $nameInput.value.trim();
  const phone_number = `${
    $phoneNumberSelect.value
  }${$phoneNumberInput1.value.trim()}${$phoneNumberInput2.value.trim()}`;

  console.log(username, password, name, phone_number);
  console.log(
    typeof username,
    typeof password,
    typeof name,
    typeof phoneNumber
  );

  // 입력값 검증
  if (!username || !password || !name || !phone_number) {
    alert("모든 필드를 입력해 주세요.");
    return;
  }

  try {
    // API 호출
    const response = await buyerSignup({
      username,
      password,
      name,
      phone_number,
    });

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
