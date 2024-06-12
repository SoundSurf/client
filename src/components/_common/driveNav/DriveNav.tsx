import styled from "styled-components";
import HamburgerBtn from "@/components/_common/hamburgerBtn/HamburgerBtn.tsx";
import Search from "@/assets/icons/search.svg?react";

const DriveNavWrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem 0 1.5rem;
  z-index: 999;
`;

const NavRight = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
`;

const DriveNav = () => {
  return (
    <DriveNavWrapper>
      <div>logo</div>
      <NavRight>
        <Search />
        <HamburgerBtn />
      </NavRight>
    </DriveNavWrapper>
  );
};

export default DriveNav;
