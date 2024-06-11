import styled from "styled-components";

export const EntireLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  background-color: #4b4b4b;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export const MainLayout = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: 25%;
  max-width: 430px;
  margin: 0;
  padding: 0;

  color: ${({ theme }) => theme.colors.grayScale1};

  background-color: black;

  @media (max-width: 1024px) {
    width: 40%;
    max-width: 430px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 430px;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.backGroundBlack};
`;
