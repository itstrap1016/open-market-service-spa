import FormLogo from "../components/FormLogo";
import TabBtns, { tabBtnsEvent } from "../components/TabBtns";
import SignUpForm, { signupSubmit } from "../components/SignUpForm";
import { validateSignup } from "../services/signupProcess";

const SignUp = () => {
  const signUpHtml = `
      <section class="signup-section">
        ${FormLogo()}
        <div class="common-form-wrap">
          ${TabBtns("구매회원가입", "판매회원가입", "signup")}
          <div class="signup-form-wrapper">
            ${SignUpForm()}
          </div>
        </div>
      </section>
    `;

  const observer = new MutationObserver(() => {
    validateSignup();
    signupSubmit();
    tabBtnsEvent();
    observer.disconnect(); // 초기화 후 관찰 중지
  });
  observer.observe(document.getElementById("app"), { childList: true });

  return signUpHtml;
};

export default SignUp;
