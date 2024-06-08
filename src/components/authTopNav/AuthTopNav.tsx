import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import BackBtn from "@/components/_common/backBtn/BackBtn.tsx";
import HamburgerBtn from "@/components/_common/hamburgerBtn/HamburgerBtn.tsx";
import ROUTES from "@/constants/routes.ts";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6.4rem 3.1rem 2rem 3.1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale9};
  margin-bottom: 8rem;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_18px_semibold};

  margin: 0 2.4rem;
  color: ${({ theme }) => theme.colors.grayScale1};
`;

const AuthTopNav = () => {
  const location = useLocation();

  const headerText = location.pathname === ROUTES.login ? "LOGIN" : "회원가입";

  return (
    <>
      <Nav>
        <BackBtn />
        <Title>{headerText}</Title>
        <HamburgerBtn />
      </Nav>
      <Outlet />
    </>
  );
};

export default AuthTopNav;
