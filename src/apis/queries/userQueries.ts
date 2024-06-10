import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postSignIn, postSignUp } from "@/apis/userApis/userApis.ts";
import ROUTES from "@/constants/routes.ts";
import { SignInParam } from "@/ssTypes/sign/external/signExternalTypes.ts";
import useUserStore from "@/store/useUserStore.ts";

export const useSignIn = (): { signIn: (body: SignInParam) => void } => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (body: SignInParam) => postSignIn(body),
    onError: () => {
      toast.error("등록된 정보가 없습니다");
    },
    onSuccess: (data) => {
      const token = data.userToken;
      if (token) {
        localStorage.setItem("userToken", token);
        toast.success("로그인 성공!");
        navigate(ROUTES.home);
      }
    },
  });

  return {
    signIn: mutate,
  };
};

export const useSignUp = (): { signUp: (body: SignInParam) => void } => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (body: SignInParam) => postSignUp(body),
    onSuccess: () => {
      toast.success("회원가입에 성공했습니다");
      navigate(ROUTES.login);
    },
    onError: () => {
      toast.error("에러가 발생했습니다");
    },
  });

  return {
    signUp: mutate,
  };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const resetUser = useUserStore((state) => state.resetUser);

  const logout = () => {
    localStorage.removeItem("userToken");
    resetUser();
    toast.success("로그아웃 성공!");
    navigate(ROUTES.login);
  };

  return { logout };
};
