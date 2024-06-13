export type SignInParam = {
  email: string;
  password: string;
};

export type SignUpRes = {
  userToken: string;
};

export type UserInfoRes = {
  userId: number;
  userEmail: string;
  nickname: boolean;
  genres: string[];
  newUser: boolean;
  carId: number;
  imageBucketPath: string;
};
