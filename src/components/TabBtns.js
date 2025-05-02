export let loginType = localStorage.getItem("loginType") || "BUYER";

const TabBtns = (name1 = "버튼", name2 = "버튼", type = "") => {
  let typeName1;
  let typeName2;

  if (name1 === "구매회원 로그인") {
    typeName1 = "BUYER";
  }

  if (name2 === "판매회원 로그인") {
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

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // 모든 버튼에서 active 클래스 제거
      buttons.forEach((btn) => btn.classList.remove("active"));

      // 클릭된 버튼에 active 클래스 추가
      button.classList.add("active");

      // 버튼 텍스트로 로그인 상태 결정
      loginType = button.dataset.loginType;
      localStorage.setItem("loginType", loginType);
    });
  });
};

export default TabBtns;
