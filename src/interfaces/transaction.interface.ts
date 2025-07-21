export interface IDeposit {
  amount: number;
  currency: string;
}

export interface IWithdraw {
  amount: number;
  currency: string;
  toUsername: string;
}

export interface IDepositResponse {
  id: string;
  depositAmount: number;
  depositCurrency: string;
  rateToUSD: number;
  totalBalance: number;
  currencyBalance: string;
}

export interface IWithdrawResponse {
  id: string;
  withdrawnAmount: number;
  withdrawnCurrency: string;
  rateToUSD: number;
  totalBalance: number;
  currencyBalance: string;
}
