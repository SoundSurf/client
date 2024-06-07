import styled from "styled-components";

export const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginPic = styled.div`
  width: 25.6rem;
  height: 14.7rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.colors.grayScale4};
`;

export const LoginMainText = styled.h1`
  ${({ theme }) => theme.fonts.headline_24px_semibold};
  text-align: center;
  margin: 1rem 0 2.8rem 0;
`;

export const LoginInput = styled.input<{ hasError: boolean }>`
  ${({ theme }) => theme.fonts.body_14px_light};
  color: ${({ theme }) => theme.colors.grayScale4};

  background: ${({ theme }) => theme.colors.grayScale9};

  display: block;

  width: 31.2rem;
  height: 4.6rem;
  padding: 0.8rem;
  margin-bottom: 0.8rem;

  border: ${({ hasError, theme }) =>
    hasError ? `1px solid ${theme.colors.alertRed}` : "1px solid transparent"};
  border-radius: 0.4rem;
  &:focus {
    outline: ${({ hasError, theme }) =>
      hasError
        ? `1px solid ${theme.colors.alertRed}`
        : "1px solid transparent"};
  }
`;

export const ForgotPasswordText = styled.a`
  ${({ theme }) => theme.fonts.sub_14px_regular};
  color: ${({ theme }) => theme.colors.purple};
  display: block;
  text-align: center;
  margin: 1.6rem 0 6.2rem 0;
`;

export const LoginBtn = styled.button`
  ${({ theme }) => theme.fonts.body_20px_semibold};
  background: ${({ theme }) => theme.colors.purple};

  width: 31.2rem;
  height: 5.4rem;

  border-radius: 0.4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.white};

  cursor: pointer;

  margin-bottom: 2rem;
  &:disabled {
    cursor: not-allowed;
  }
`;

export const SignUpText = styled.span`
  ${({ theme }) => theme.fonts.sub_14px_regular};
  color: ${({ theme }) => theme.colors.grayScale1};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignUpAnchor = styled.a`
  margin-left: 0.4rem;
  color: ${({ theme }) => theme.colors.purple};
  text-decoration: underline;
`;

export const AuthInputErrorText = styled.span`
  ${({ theme }) => theme.fonts.sub_12px_regular};
  display: block;
  color: ${({ theme }) => theme.colors.alertRed};
  margin: 0.4rem 0;
  height: 1.2rem;
`;
