import { PropsWithChildren, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast("로그인이 필요합니다.");
      navigate("/login");
    }
  });

  return <>{children}</>;
};

export default AuthGuard;
