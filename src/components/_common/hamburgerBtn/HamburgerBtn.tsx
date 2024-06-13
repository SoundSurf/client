import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useLogout } from "@/apis/queries/userQueries.ts";
import Hamburger from "@/assets/icons/hamburger.svg?react";

const StyledHamburgerIcon = styled(Hamburger)<{
  width?: string;
  height?: string;
  color?: string;
}>`
  width: ${({ width }) => width || "24px"};
  height: ${({ height }) => height || "24px"};
  fill: ${({ color, theme }) => color || theme.colors.primary};
`;

const Menu = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: absolute;
  top: 120%;
  right: 30%;
  width: 13.8rem;
  color: ${({ theme }) => theme.colors.grayScale1};
  background: ${({ theme }) => theme.colors.menubarBackgroundBlack60};
  border-radius: 4px;
  padding: 10px;
  z-index: 1000;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }

    a {
      color: ${({ theme }) => theme.colors.text};
      text-decoration: none;
    }
  }
`;

type HamburgerBtnProps = {
  width?: string;
  height?: string;
  color?: string;
};

const HamburgerBtn = ({ width, height, color }: HamburgerBtnProps) => {
  const { logout } = useLogout();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      event.stopPropagation();
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]);

  return (
    <div style={{ position: "relative" }} ref={menuRef}>
      <a onClick={toggleMenu}>
        <StyledHamburgerIcon width={width} height={height} color={color} />
      </a>
      <Menu visible={menuVisible}>
        <ul>
          <PopupLi>
            <a href="/">Drive</a>
          </PopupLi>
          <PopupLi>
            <a href="/myPlayList">My Playlist</a>
          </PopupLi>
          <PopupLi>
            <button onClick={logout}>Logout</button>
          </PopupLi>
        </ul>
      </Menu>
    </div>
  );
};

export default HamburgerBtn;

const PopupLi = styled.li`
  font-weight: 600;
`;
