import styled from "styled-components";
import {
  LoginBtn,
  LoginInput,
} from "@/components/pages/loginPage/LoginPage.styles.ts";

export const SignupInput = styled(LoginInput)<{ hasError: boolean }>`
  margin-top: 1.2rem;
  border: ${({ hasError, theme }) =>
    hasError ? `1px solid ${theme.colors.alertRed}` : "none"};
  &:focus {
    outline: ${({ hasError, theme }) =>
      hasError ? `1px solid ${theme.colors.alertRed}` : "none"};
  }
`;

export const InputText = styled.p`
  ${({ theme }) => theme.fonts.body_14px_semibold};
  margin-top: 3rem;
  color: ${({ theme }) => theme.colors.grayScale1};
`;

export const AuthBorder = styled.hr`
  width: 100%;
  height: 0.2rem;
  margin-top: 3.2rem;

  background-color: ${({ theme }) => theme.colors.grayScale8};
  border: none;
`;

export const PasswordInfoText = styled.p`
  ${({ theme }) => theme.fonts.sub_14px_regular};
  color: ${({ theme }) => theme.colors.grayScale6};
  margin-top: 0.4rem;
`;

export const TermsOfUseBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-top: 2rem;
`;

export const TermsCheckbox = styled.input`
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 1rem;
`;

export const TermsText = styled.p`
  ${({ theme }) => theme.fonts.sub_14px_regular};
  color: ${({ theme }) => theme.colors.grayScale1};
`;

export const TermsDetailAnchor = styled.a`
  ${({ theme }) => theme.fonts.sub_14px_regular};
  color: ${({ theme }) => theme.colors.grayScale5};
  text-decoration: underline;
`;

export const Portion = styled.div`
  display: flex;
`;

export const SignupBtn = styled(LoginBtn)`
  margin-top: 2rem;
`;
