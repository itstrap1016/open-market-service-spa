import { validateSignup } from "../services/signupProcess";
import SignUpForm, { signupSubmit } from "./SignUpForm";
import { USER_TYPES } from "../constants/constants";
import { getElement } from "../utils/utils";

// 타입 결정 함수
const getTypeName = (name) => {
  if (name.includes("구매회원")) return USER_TYPES.BUYER;
  if (name.includes("판매회원")) return USER_TYPES.SELLER;
  return null;
};

// 버튼 생성 함수
const TabBtns = (name1 = "버튼", name2 = "버튼", type = "") => {
  const typeName1 = getTypeName(name1);
  const typeName2 = getTypeName(name2);

  return `
    <ul class="common-btns-list">
        <li>
            <button class="tab-btn active" data-${type}-type="${typeName1}">${name1}</button>
        </li>
        <li>
            <button class="tab-btn" data-${type}-type="${typeName2}">${name2}</button>
        </li>
    </ul>
  `;
};

// 탭 클릭 처리 함수
const handleTabClick = ($button, $formWrapper) => {
  const type = $button.dataset.signupType;

  // 모든 버튼에서 active 클래스 제거
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));

  // 클릭된 버튼에 active 클래스 추가
  $button.classList.add("active");

  // 폼 업데이트
  $formWrapper.innerHTML = "";
  $formWrapper.insertAdjacentHTML(
    "afterbegin",
    SignUpForm(type === USER_TYPES.SELLER ? USER_TYPES.SELLER : null)
  );

  // 폼 검증 및 이벤트 등록
  validateSignup();
  signupSubmit();
};

// 버튼 이벤트 리스너 등록
export const tabBtnsEvent = () => {
  const $formWrapper = getElement(".common-form-wrap > .signup-form-wrapper");

  document.querySelectorAll(".tab-btn").forEach(($button) => {
    $button.addEventListener("click", () =>
      handleTabClick($button, $formWrapper)
    );
  });
};

export default TabBtns;
