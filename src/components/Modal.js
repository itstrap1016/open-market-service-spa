import { getElement } from "../utils/utils";

const Modal = () => {
  return `
      <dialog class="login-modal">
        <button class="close-btn"></button>
        <p>
            로그인이 필요한 서비스입니다.<br/>
            로그인 하시겠습니까?
        </p>
        <div class="btns">
            <button class="secondary-btn">아니오</button>
            <a class="primary-btn" href="/login">예</a>
        </div>
      </dialog>
    `;
};

export const setModalEvents = () => {
  const $modal = getElement(".login-modal");
  const $closeBtn = getElement(".login-modal .close-btn");
  const $noBtn = getElement(".login-modal .secondary-btn");

  if ($closeBtn) {
    $closeBtn.addEventListener("click", () => {
      $modal.classList.remove("on"); // 모달 닫기
    });
  }

  if ($noBtn) {
    $noBtn.addEventListener("click", () => {
      $modal.classList.remove("on"); // 모달 닫기
    });
  }
};

export default Modal;
