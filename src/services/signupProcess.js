import {
  validateBusinessNumber,
  validateUsername,
  buyerSignup,
  sellerSignup,
} from "../api/signupApi";

const checkStatus = {
  isIdChecked: false, // 아이디 중복확인 상태
  isPasswordConfirmed: false, // 비밀번호 재확인 상태
  isBusinessChecked: true,
};

const getInputDoms = () => {
  const $idInput = document.querySelector("#user-id");
  const $passwordInput = document.querySelector("#password");
  const $passwordCheckInput = document.querySelector("#password-check");
  const $nameInput = document.querySelector("#name");
  const $businessInput = document.querySelector("#business-number");
  const $storeNameInput = document.querySelector("#store-name");
  const $phoneNumberSelect = document.querySelector("#phone-number-select");
  const $phoneNumberInput1 = document.querySelector(".number-input-01");
  const $phoneNumberInput2 = document.querySelector(".number-input-02");

  return {
    $idInput,
    $passwordInput,
    $passwordCheckInput,
    $nameInput,
    $businessInput,
    $storeNameInput,
    $phoneNumberInput1,
    $phoneNumberInput2,
    $phoneNumberSelect,
  };
};

const getButtonDoms = () => {
  const $idValidateBtn = document.querySelector(".id-validate-btn");
  const $businessValidateBtn = document.querySelector(
    ".business-number-validate-btn"
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

  return {
    $idValidateBtn,
    $businessValidateBtn,
    $passwordCheckBtn,
    $passwordReCheckBtn,
    $termsCheckbox,
    $signupBtn,
  };
};

const getMessageDoms = () => {
  const $idErrorMessage = document.querySelector(
    ".id-input-set .error-message"
  );
  const $passwordErrorMessage = document.querySelector(
    ".password-input-set .error-message"
  );
  const $passwordCheckErrorMessage = document.querySelector(
    ".password-check-input-set .error-message"
  );
  const $nameErrorMessage = document.querySelector(
    ".name-input-set .error-message"
  );
  const $phoneErrorMessage = document.querySelector(
    ".phone-number-set .error-message"
  );
  const $businessErrorMessage = document.querySelector(
    ".business-number-set .error-message"
  );
  const $storeErrorMessage = document.querySelector(
    ".store-name-set .error-message"
  );
  const $successMessage = document.querySelector(
    ".id-input-set .success-message"
  );
  const $businessSuccessMessage = document.querySelector(
    ".business-number-set .success-message"
  );

  return {
    $idErrorMessage,
    $passwordErrorMessage,
    $passwordCheckErrorMessage,
    $nameErrorMessage,
    $phoneErrorMessage,
    $businessErrorMessage,
    $storeErrorMessage,
    $successMessage,
    $businessSuccessMessage,
  };
};

const errorMessages = {
  required: "필수 정보입니다",
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

export const validateSignup = () => {
  const $signupForm = document.querySelector(".signup-form");
  const {
    $idInput,
    $passwordInput,
    $passwordCheckInput,
    $nameInput,
    $businessInput,
    $storeNameInput,
    $phoneNumberInput1,
    $phoneNumberInput2,
  } = getInputDoms();
  const {
    $idValidateBtn,
    $businessValidateBtn,
    $passwordCheckBtn,
    $passwordReCheckBtn,
    $termsCheckbox,
  } = getButtonDoms();
  const {
    $idErrorMessage,
    $passwordErrorMessage,
    $passwordCheckErrorMessage,
    $nameErrorMessage,
    $phoneErrorMessage,
    $businessErrorMessage,
    $storeErrorMessage,
    $successMessage,
    $businessSuccessMessage,
  } = getMessageDoms();

  // signup-form 내 모든 input과 select 요소에 이벤트 추가
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

  if (!$idInput) {
    console.error("idInput 요소를 찾을 수 없습니다.");
    return;
  }

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
    console.log(data);

    if (data && data.error) {
      showError($idErrorMessage, data.error, $successMessage);
      checkStatus.isIdChecked = false;
    } else if (data && data.message) {
      console.log("working");
      hideError($idErrorMessage, $successMessage);
      checkStatus.isIdChecked = true;
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
      checkStatus.isPasswordConfirmed = false;
    }
    if (passwordCheckValue !== passwordValue) {
      $passwordReCheckBtn.classList.remove("on");
      showError($passwordCheckErrorMessage, errorMessages.passwordCheckError);
      checkStatus.isPasswordConfirmed = false;
    }
    if (passwordCheckValue === passwordValue && passwordValue) {
      $passwordReCheckBtn.classList.add("on");
      hideError($passwordCheckErrorMessage);
      checkStatus.isPasswordConfirmed = true;
    }
  });

  $nameInput.addEventListener("click", () => {
    const idValue = $idInput.value.trim();
    const passwordValue = $passwordInput.value.trim();
    const passwordCheckValue = $passwordCheckInput.value.trim();

    if (!idValue) {
      showError($idErrorMessage, errorMessages.required);
    }
    if (!passwordValue) {
      showError($passwordErrorMessage, errorMessages.required);
    }
    if (!passwordCheckValue) {
      showError($passwordCheckErrorMessage, errorMessages.required);
    }
  });

  $nameInput.addEventListener("blur", () => {
    const nameValue = $nameInput.value.trim();

    if (!nameValue) {
      showError($nameErrorMessage, errorMessages.required);
    } else {
      hideError($nameErrorMessage);
    }
  });

  $phoneNumberInput1.addEventListener("click", () => {
    const idValue = $idInput.value.trim();
    const passwordValue = $passwordInput.value.trim();
    const passwordCheckValue = $passwordCheckInput.value.trim();
    const nameValue = $nameInput.value.trim();

    if (!idValue) {
      showError($idErrorMessage, errorMessages.required);
    }
    if (!passwordValue) {
      showError($passwordErrorMessage, errorMessages.required);
    }
    if (!passwordCheckValue) {
      showError($passwordCheckErrorMessage, errorMessages.required);
    }
    if (!nameValue) {
      showError($nameErrorMessage, errorMessages.required);
    }
  });

  $phoneNumberInput1.addEventListener("blur", () => {
    const phoneValue = $phoneNumberInput1.value.trim();

    if (!phoneValue) {
      showError($phoneErrorMessage, errorMessages.required);
    } else {
      hideError($phoneErrorMessage);
    }
  });

  if ($businessInput) {
    $businessValidateBtn.addEventListener("click", async () => {
      const value = $businessInput.value.trim();
      const data = await validateBusinessNumber(value);

      if (data && data.message) {
        hideError($businessErrorMessage, $businessSuccessMessage);
        checkStatus.isBusinessChecked = true;
      } else if (data && data.error) {
        showError($businessErrorMessage, data.error, $businessSuccessMessage);
        checkStatus.isBusinessChecked = false;
      }
    });

    $businessInput.addEventListener("click", () => {
      const idValue = $idInput.value.trim();
      const passwordValue = $passwordInput.value.trim();
      const passwordCheckValue = $passwordCheckInput.value.trim();
      const nameValue = $nameInput.value.trim();
      const phoneNumberValue1 = $phoneNumberInput1.value.trim();
      const phoneNumberValue2 = $phoneNumberInput2.value.trim();

      if (!idValue) {
        showError($idErrorMessage, errorMessages.required);
      }
      if (!passwordValue) {
        showError($passwordErrorMessage, errorMessages.required);
      }
      if (!passwordCheckValue) {
        showError($passwordCheckErrorMessage, errorMessages.required);
      }
      if (!nameValue) {
        showError($nameErrorMessage, errorMessages.required);
      }
      if (!phoneNumberValue1 || !phoneNumberValue2) {
        showError($phoneErrorMessage, errorMessages.required);
      }
    });

    $businessInput.addEventListener("blur", () => {
      const businessValue = $businessInput.value.trim();

      if (!businessValue) {
        showError($businessErrorMessage, errorMessages.required);
      } else {
        hideError($businessErrorMessage);
      }
    });
  }

  if ($storeNameInput) {
    $storeNameInput.addEventListener("click", () => {
      const idValue = $idInput.value.trim();
      const passwordValue = $passwordInput.value.trim();
      const passwordCheckValue = $passwordCheckInput.value.trim();
      const nameValue = $nameInput.value.trim();
      const phoneNumberValue1 = $phoneNumberInput1.value.trim();
      const phoneNumberValue2 = $phoneNumberInput2.value.trim();
      const businessValue = $businessInput.value.trim();

      if (!idValue) {
        showError($idErrorMessage, errorMessages.required);
      }
      if (!passwordValue) {
        showError($passwordErrorMessage, errorMessages.required);
      }
      if (!passwordCheckValue) {
        showError($passwordCheckErrorMessage, errorMessages.required);
      }
      if (!nameValue) {
        showError($nameErrorMessage, errorMessages.required);
      }
      if (!phoneNumberValue1 || !phoneNumberValue2) {
        showError($phoneErrorMessage, errorMessages.required);
      }
      if (!businessValue) {
        showError($businessErrorMessage, errorMessages.required);
      }
    });
    $storeNameInput.addEventListener("blur", () => {
      const storeValue = $storeNameInput.value.trim();

      if (!storeValue) {
        showError($storeErrorMessage, errorMessages.required);
      } else {
        hideError($storeErrorMessage);
      }
    });
  }

  $termsCheckbox.addEventListener("change", () => {
    updateSignupBtnState(); // 버튼 상태 업데이트
  });
};

export const handleSignup = async () => {
  // DOM 가져오기
  const {
    $idInput,
    $passwordInput,
    $nameInput,
    $businessInput,
    $storeNameInput,
    $phoneNumberInput1,
    $phoneNumberInput2,
    $phoneNumberSelect,
  } = getInputDoms();

  const $activeTab = document.querySelector(".tab-btn.active"); // 활성화된 탭
  const signupType = $activeTab ? $activeTab.dataset.signupType : null; // 탭의 데이터 속성으로 타입 확인

  // 입력값 가져오기
  const username = $idInput.value.trim();
  const password = $passwordInput.value.trim();
  const name = $nameInput.value.trim();
  const phone_number = `${
    $phoneNumberSelect.value
  }${$phoneNumberInput1.value.trim()}${$phoneNumberInput2.value.trim()}`;
  const business_number = $businessInput ? $businessInput.value.trim() : null;
  const store_name = $storeNameInput ? $storeNameInput.value.trim() : null;

  // 입력값 검증
  if (!username || !password || !name || !phone_number) {
    alert("모든 필드를 입력해 주세요.");
    return;
  }

  try {
    let response;

    // 구매자 회원가입
    if (signupType === "BUYER") {
      response = await buyerSignup({ username, password, name, phone_number });
    }
    // 판매자 회원가입
    else if (signupType === "SELLER") {
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
