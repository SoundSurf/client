import clientInstance from "@/apis/client.ts";
import {
  SignInParam,
  SignUpRes,
} from "@/ssTypes/sign/external/signExternalTypes.ts";

export const postSignIn = async (body: SignInParam): Promise<SignUpRes> => {
  const { data } = await clientInstance.post(`/user/login`, body);

  return data;
};

export const postSignUp = async (body: SignInParam): Promise<SignUpRes> => {
  const { data } = await clientInstance.post(`/user/create`, body);

  return data;
};
