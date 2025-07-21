export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  username: string;
  wallet: Wallet;
  accessToken: string;
}

export interface Wallet {
  id: string;
  balance: string;
  currency: string;
}
