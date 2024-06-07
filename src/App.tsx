import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import TopLayout from "@/components/_common/layoutComponents/topLayout/TopLayout.tsx";
import LoginPage from "@/components/pages/loginPage/LoginPage.tsx";
import MainPage from "@/components/pages/mainPage/MainPage.tsx";
import ROUTES from "@/constants/routes.ts";
import GlobalStyle from "@/styles/GlobalStyle.tsx";
import theme from "@/styles/theme.ts";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <TopLayout>
          <Routes>
            <Route path={ROUTES.home} element={<MainPage />} />
            <Route path={ROUTES.login} element={<LoginPage />} />
          </Routes>
        </TopLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
