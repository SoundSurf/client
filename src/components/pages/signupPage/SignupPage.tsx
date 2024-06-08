import { useForm } from "react-hook-form";
import { useSignIn } from "@/apis/queries/userQueries.ts";
import {
  AuthInputErrorText,
  LoginBtn,
  LoginPageWrapper,
} from "@/components/pages/loginPage/LoginPage.styles.ts";
import { USER_REGEX } from "@/constants/regex.ts";
import { SignUpData } from "@/ssTypes/sign/internal/signInternalTypes.ts";
import * as S from "./SignupPage.styles.ts";
import { TermsDetailAnchor } from "./SignupPage.styles.ts";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpData>({ mode: "onChange" });

  const { signIn } = useSignIn();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  const password = watch("password");

  return (
    <LoginPageWrapper>
      <div>
        <form onSubmit={onSubmit}>
          <S.InputText>이메일 설정 *</S.InputText>
          <S.SignupInput
            hasError={!!errors.email}
            type="email"
            placeholder="예) sound@gmail.com"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: USER_REGEX.EMAIL,
                message: "이메일 형식이 맞지 않습니다",
              },
            })}
          />
          <AuthInputErrorText>
            {errors.email ? errors.email.message : "\u00A0"}
          </AuthInputErrorText>
          <S.AuthBorder />
          <S.InputText>비밀번호 설정 *</S.InputText>
          <S.SignupInput
            hasError={!!errors.password}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: USER_REGEX.PASSWORD,
                message: "영문+숫자 혼합 6~16자",
              },
            })}
          />
          <AuthInputErrorText>
            {errors.password ? errors.password.message : "\u00A0"}
          </AuthInputErrorText>
          {!errors.password && (
            <S.PasswordInfoText>영문+숫자 혼합 6~16자</S.PasswordInfoText>
          )}

          <S.InputText>비밀번호 재설정 *</S.InputText>
          <S.SignupInput
            hasError={!!errors.rePassword}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("rePassword", {
              required: "비밀번호를 다시 입력해주세요",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다",
            })}
          />
          <AuthInputErrorText>
            {errors.rePassword ? errors.rePassword.message : "\u00A0"}
          </AuthInputErrorText>

          <S.AuthBorder />

          <S.TermsOfUseBox>
            <S.Portion>
              <S.TermsCheckbox
                type="checkbox"
                {...register("terms", {
                  required: "이용약관에 동의해주세요",
                })}
              />
              <S.TermsText>이용약관 전체 동의</S.TermsText>
            </S.Portion>
            <TermsDetailAnchor>자세히 보기</TermsDetailAnchor>
          </S.TermsOfUseBox>
          <AuthInputErrorText>
            {errors.terms ? errors.terms.message : "\u00A0"}
          </AuthInputErrorText>

          <LoginBtn type="submit" disabled={!isValid}>
            가입하기
          </LoginBtn>
        </form>
      </div>
    </LoginPageWrapper>
  );
};

export default SignupPage;
