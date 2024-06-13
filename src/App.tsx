import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AuthGuard from "@/components/AuthGuard.tsx";
import TopLayout from "@/components/_common/layoutComponents/topLayout/TopLayout.tsx";
import AuthTopNav from "@/components/authTopNav/AuthTopNav.tsx";
import LoginPage from "@/components/pages/loginPage/LoginPage.tsx";
import MainPage from "@/components/pages/mainPage/MainPage.tsx";
import MyPlayListPage from "@/components/pages/myPlayListPage/MyPlayListPage.tsx";
import SignupPage from "@/components/pages/signupPage/SignupPage.tsx";
import ROUTES from "@/constants/routes.ts";
import GlobalStyle from "@/styles/GlobalStyle.tsx";
import theme from "@/styles/theme.ts";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <TopLayout>
          <Suspense fallback={<div>loading....</div>}>
            <Routes>
              <Route
                path={ROUTES.home}
                element={
                  <AuthGuard>
                    <MainPage />
                  </AuthGuard>
                }
              />
              <Route path={ROUTES.myPlayList} element={<MyPlayListPage />} />
              <Route path="/" element={<AuthTopNav />}>
                <Route path={ROUTES.login} element={<LoginPage />} />
                <Route path={ROUTES.signup} element={<SignupPage />} />
              </Route>
            </Routes>
          </Suspense>
        </TopLayout>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
