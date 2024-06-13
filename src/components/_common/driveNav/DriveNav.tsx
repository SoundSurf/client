import styled from "styled-components";
import HamburgerBtn from "@/components/_common/hamburgerBtn/HamburgerBtn.tsx";
import Search from "@/assets/icons/search.svg?react";
import Logo from "@/assets/logo.svg?react";

const DriveNavWrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem 0 1.5rem;
  z-index: 100;
  height: 20rem;
`;

const NavRight = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
`;

const NavLogo = styled(Logo)`
  width: 8.5rem;
  height: 2.4rem;
`;

const DriveNav = () => {
  return (
    <DriveNavWrapper>
      <NavLogo />
      <NavRight>
        <Search />
        <HamburgerBtn />
      </NavRight>
    </DriveNavWrapper>
  );
};

export default DriveNav;
