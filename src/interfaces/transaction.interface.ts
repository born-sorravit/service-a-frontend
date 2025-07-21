export interface IDeposit {
  amount: number;
  currency: string;
}

export interface IWithdraw {
  amount: number;
  currency: string;
  toUsername: string;
}
