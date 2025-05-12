import { getElement } from "../utils/utils";

export const getInputDoms = () => {
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

export const getButtonDoms = () => {
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

export const getMessageDoms = () => {
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
