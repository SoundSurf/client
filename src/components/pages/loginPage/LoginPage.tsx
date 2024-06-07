import { useForm } from "react-hook-form";
import { USER_REGEX } from "@/constants/regex.ts";
import { SignInData } from "@/ssTypes/sign/internal/signInternalTypes.ts";
import * as S from "./LoginPage.styles.ts";

const LoginPage = () => {
  const TEXTS = {
    login: "LOGIN",
    emailPlaceholder: "이메일을 입력해주세요",
    passwordPlaceholder: "비밀번호를 입력해주세요",
    forgotPassword: "비밀번호를 잊으셨나요?",
    loginBtn: "로그인",
    noAccount: "아직 계정이 없으신가요?",
    signUp: "가입하기",
    inputError: "입력한 정보를 다시 확인해주세요",
  } as const;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInData>({ mode: "onChange" });

  return (
    <S.LoginPageWrapper>
      <S.LoginPic>main</S.LoginPic>

      <div>
        <S.LoginMainText>{TEXTS.login}</S.LoginMainText>
        <S.LoginInput
          hasError={!!errors.email}
          type="email"
          placeholder={TEXTS.emailPlaceholder}
          {...register("email", {
            required: TEXTS.inputError,
            pattern: {
              value: USER_REGEX.EMAIL,
              message: TEXTS.inputError,
            },
          })}
        />
        <S.AuthInputErrorText>
          {errors.email ? errors.email.message : "\u00A0"}
        </S.AuthInputErrorText>
        <S.LoginInput
          hasError={!!errors.password}
          type="password"
          placeholder={TEXTS.passwordPlaceholder}
          {...register("password", {
            required: TEXTS.inputError,
            pattern: {
              value: USER_REGEX.PASSWORD,
              message: TEXTS.inputError,
            },
          })}
        />
        <S.AuthInputErrorText>
          {errors.password ? errors.password.message : "\u00A0"}
        </S.AuthInputErrorText>
        <S.ForgotPasswordText>{TEXTS.forgotPassword}</S.ForgotPasswordText>
      </div>

      <S.LoginBtn disabled={!isValid}>{TEXTS.loginBtn}</S.LoginBtn>
      <S.SignUpText>
        {TEXTS.noAccount}
        <S.SignUpAnchor>{TEXTS.signUp}</S.SignUpAnchor>
      </S.SignUpText>
    </S.LoginPageWrapper>
  );
};

export default LoginPage;
