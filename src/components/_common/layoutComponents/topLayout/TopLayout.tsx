import { PropsWithChildren } from "react";
import * as S from "./TopLayout.styles.ts";

const TopLayout = ({ children }: PropsWithChildren) => {
  return (
    <S.EntireLayout>
      <S.MainLayout>
        <S.MainContent>{children}</S.MainContent>
      </S.MainLayout>
    </S.EntireLayout>
  );
};

export default TopLayout;
