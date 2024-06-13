import clientInstance from "@/apis/client.ts";
import { IsMusicSavedRes } from "@/ssTypes/drive/driveTypes.ts";
import {
  SignInParam,
  SignUpRes, UserInfoRes
} from "@/ssTypes/sign/external/signExternalTypes.ts";

export const postSignIn = async (body: SignInParam): Promise<SignUpRes> => {
  const { data } = await clientInstance.post(`/user/login`, body);

  return data;
};

export const postSignUp = async (body: SignInParam): Promise<SignUpRes> => {
  const { data } = await clientInstance.post(`/user/create`, body);

  return data;
};

export const getUserInfo = async (): Promise<UserInfoRes> => {
  const { data } = await clientInstance.get("/user");
  return data;
};
