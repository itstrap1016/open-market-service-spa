import FormLogo from "../components/FormLogo";
import TabBtns from "../components/TabBtns";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
  const signUpHtml = `
      <section class="signup-section">
        ${FormLogo()}
        <div class="common-form-wrap">
          ${TabBtns("구매회원가입", "판매회원가입", "signup")}
          <div>
            ${SignUpForm()}
          </div>
        </div>
      </section>
    `;

  return signUpHtml;
};

export default SignUp;
