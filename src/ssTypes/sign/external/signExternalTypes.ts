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
  nickname: string | null;
  genres: string[];
  newUser: boolean;
  carId: number;
  imageBucketPath: string;
  savedMusicCount: number;
  playListCount: number;
};
