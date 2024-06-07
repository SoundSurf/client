import clientInstance from "@/apis/client.ts";
import { SignInParam } from "@/ssTypes/sign/external/signExternalTypes.ts";

export const postSignIn = async (body: SignInParam) => {
  const { data } = await clientInstance.post(`/user/login`, body);

  return data;
};
