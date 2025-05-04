import ErrorMessage from "./ErrorMessage";

let idError;
let idErrorMessage;
let passwordError;
let passwordErrorMessage;
let passwordCheckError;
let passwordCheckErrorMessage;
let personalInfoError;
let personalInfoErrorMessage;

const SignUpForm = () => {
  return `
      <form class="signup-form">
        <div class="fieldset-wrapper">
            <fieldset class="id-input-set">
            <label for="user-id">아이디</label>
            <div class="input-button">
                <input id="user-id" class="signup-input" type="text"/>
                <button class="primary-btn" type="button">
                중복확인
                </button>
            </div>
            ${idError ? ErrorMessage(idErrorMessage) : ""}
            </fieldset>
            <fieldset class="password-input-set">
            <label for="password">비밀번호</label>
            <div class="input-check">
                <input id="password" class="signup-input" type="password" />
                <input class="password-check-btn" type="checkbox" />
            </div>
            ${passwordError ? ErrorMessage(passwordErrorMessage) : ""}
            </fieldset>
            <fieldset class="password-check-input-set">
            <label for="password-check">비밀번호 재확인</label>
            <div class="input-check">
                <input id="password-check" class="signup-input" type="password" />
                <input class="password-check-btn" type="checkbox" />
            </div>
            ${passwordCheckError ? ErrorMessage(passwordCheckErrorMessage) : ""}
            </fieldset>
            <fieldset class="name-input-set">
            <label for="name">이름</label>
            <input id="name" class="signup-input" type="text" />
            </fieldset>
            <fieldset>
            <label for="phone-number-select">휴대폰번호</label>
            <div class="inputs-wrapper">
                <select id="phone-number-select">
                <option value="010">010</option>
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
                <input type="number" />
                <input type="number" />
            </div>
            ${personalInfoError ? ErrorMessage(personalInfoErrorMessage) : ""}
            </fieldset>
        </div>
        <div class="terms-agreement">
          <input type="checkbox" />
          <p>호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에 대한 내용을 확인하였고 동의합니다.</p>
        </div>
        <button type="submit" disabled>가입하기</button>
      </form>
    `;
};

export default SignUpForm;
