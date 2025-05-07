import { validateSignup } from "../services/signupProcess";
import SignUpForm from "./SignUpForm";

const TabBtns = (name1 = "버튼", name2 = "버튼", type = "") => {
  let typeName1;
  let typeName2;

  if (name1 === "구매회원 로그인" || name1 === "구매회원가입") {
    typeName1 = "BUYER";
  }

  if (name2 === "판매회원 로그인" || name2 === "판매회원가입") {
    typeName2 = "SELLER";
  }

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

// 버튼 이벤트 리스너 등록
export const tabBtnsEvent = () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const $formWrapper = document.querySelector(
    ".common-form-wrap > .signup-form-wrapper"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // 모든 버튼에서 active 클래스 제거
      buttons.forEach((btn) => btn.classList.remove("active"));

      // 클릭된 버튼에 active 클래스 추가
      button.classList.add("active");

      const type = button.dataset.signupType;
      if (type && type === "BUYER") {
        $formWrapper.innerHTML = "";
        $formWrapper.insertAdjacentHTML("afterbegin", SignUpForm());
        validateSignup();
      } else if (type && type === "SELLER") {
        $formWrapper.innerHTML = "";
        $formWrapper.insertAdjacentHTML("afterbegin", SignUpForm("SELLER"));
        validateSignup();
      }
    });
  });
};

export default TabBtns;
