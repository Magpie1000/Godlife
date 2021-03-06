export interface JoinInput {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserInfo {
  email: string;
  name: string;
  godCount: number;
  recentDate: null;
  joinType: string;
  info: string;
  followerCnt: number;
  followingCnt: number;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}
