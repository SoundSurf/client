import { PropsWithChildren } from "react";
import * as S from "./Layout.styles.ts";

const Layout = ({ children }: PropsWithChildren) => {
  return <S.Layout>{children}</S.Layout>;
};

export default Layout;
