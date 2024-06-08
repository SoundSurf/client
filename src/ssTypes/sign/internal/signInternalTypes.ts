export type User = {
  userId: number;
  userEmail: string;
  nickname: string | null;
  newUser: boolean;
  carId: number;
  profileId: number;
};

export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = SignInData & {
  rePassword: string;
  terms: boolean;
};
