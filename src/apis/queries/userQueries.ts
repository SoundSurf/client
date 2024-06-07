import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { postSignIn } from "@/apis/userApis/userApis.ts";
import { SignInParam } from "@/ssTypes/sign/external/signExternalTypes.ts";

export const useSignIn = (): { signIn: (body: SignInParam) => void } => {
  const { mutate } = useMutation({
    mutationFn: (body: SignInParam) => postSignIn(body),
    onError: () => {
      toast.error("등록된 정보가 없습니다");
    },
  });

  return {
    signIn: mutate,
  };
};
