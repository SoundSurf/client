import styled from "styled-components";

export const EntireLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically */

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  background-color: #4b4b4b;
`;

export const MainLayout = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: 100%;
  margin: 0; /* Remove any margin */
  padding: 0; /* Remove any padding */

  color: ${({ theme }) => theme.colors.grayScale1};

  background-color: ${({ theme }) => theme.colors.backGroundBlack};

  @media (max-width: 1024px) {
    width: 75%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: 100%;
  height: 100%; /* Make MainContent fill the remaining height */
  padding: 10px;
`;
