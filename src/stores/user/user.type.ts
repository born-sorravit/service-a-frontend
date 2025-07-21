import { IUserInfo } from "@/interfaces/user.interface";

export interface IUserState {
  user: IUserInfo;
}

export interface IUserStore extends IUserState {
  setUser: (user: IUserInfo) => void;
  refetch: () => void;
  reset: () => void;
}
