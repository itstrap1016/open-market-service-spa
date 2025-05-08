import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { handleSignup } from "../services/signupProcess";

const SignUpForm = (type = null) => {
  let additionalHtml;
  if (type === "SELLER") {
    additionalHtml = `
    <fieldset class="business-number-set">
      <label for="business-number">사업자 등록번호</label>
      <div class="input-button">
          <input id="business-number" class="signup-input" type="number" />
          <button class="business-number-validate-btn primary-btn" type="button">
          인증
          </button>
      </div>
      ${ErrorMessage("")}
      ${SuccessMessage("사용 가능한 사업자등록번호입니다.")}
    </fieldset>
    <fieldset class="store-name-set">
      <label for="store-name">스토어 이름</label>
      <input id="store-name" class="signup-input" type="text" />
      ${ErrorMessage("")}
    </fieldset>
    `;
  }

  return `
      <form class="signup-form">
        <div class="fieldset-wrapper">
            <fieldset class="id-input-set">
              <label for="user-id">아이디</label>
              <div class="input-button">
                  <input id="user-id" class="signup-input" type="text" autocomplete="username"/>
                  <button class="id-validate-btn primary-btn" type="button">
                  중복확인
                  </button>
              </div>
              ${ErrorMessage("")}
              ${SuccessMessage()}
            </fieldset>
            <fieldset class="password-input-set">
              <label for="password">비밀번호</label>
              <div class="input-check">
                  <input id="password" class="signup-input" type="password" autocomplete="new-password"/>
                  <div class="custom-check-btn"></div>
              </div>
              ${ErrorMessage("")}
            </fieldset>
            <fieldset class="password-check-input-set">
              <label for="password-check">비밀번호 재확인</label>
              <div class="input-check">
                  <input id="password-check" class="signup-input" type="password" autocomplete="new-password"/>
                  <div class="custom-check-btn"></div>
              </div>
              ${ErrorMessage("")}
            </fieldset>
            <fieldset class="name-input-set">
              <label for="name">이름</label>
              <input id="name" class="signup-input" type="text" />
              ${ErrorMessage("")}
            </fieldset>
            <fieldset class="phone-number-set">
              <label for="phone-number-select">휴대폰번호</label>
              <div class="inputs-wrapper">
                  <select id="phone-number-select">
                    <option value="010" selected>010</option>
                    <option value="011">011</option>
                    <option value="012">012</option>
                    <option value="013">013</option>
                    <option value="014">014</option>
                    <option value="015">015</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                  <input type="number" class="signup-input number-input-01" />
                  <input type="number" class="signup-input number-input-02" />
              </div>
            </fieldset>
            ${type === "SELLER" ? additionalHtml : ""}
        </div>
        <div class="terms-agreement">
          <div class="checkbox-wrapper">
            <input type="checkbox" />
            <div class="custom-checkbox"></div>
          </div>
          <p>호두샵의 <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 대한 내용을 확인하였고 동의합니다.</p>
        </div>
        <div class="btn-wrapper">
          <button class="primary-btn signup-btn" type="submit" disabled>가입하기</button>
        </div>
      </form>
    `;
};

export const signupSubmit = () => {
  const $form = document.querySelector(".signup-form");
  const $btn = document.querySelector(".signup-form .signup-btn");

  $form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await handleSignup();
  });
  $btn.addEventListener("click", async (e) => {
    e.preventDefault();
    await handleSignup();
  });
};

export default SignUpForm;
