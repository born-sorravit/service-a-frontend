import { IDeposit, IWithdraw } from "@/interfaces/transaction.interface";
import httpClient from "@/utils/httpClient";

const deposit = async (walletId: string, depositDto: IDeposit) => {
  const path = `/common/wallet/deposit/${walletId}`;
  const response = await httpClient().post(path, {
    ...depositDto,
  });
  return response.data;
};

const withdraw = async (walletId: string, withdrawDto: IWithdraw) => {
  const path = `/common/wallet/withdraw/${walletId}`;
  const response = await httpClient().post(path, {
    ...withdrawDto,
  });
  return response.data;
};

export const TransactionServices = {
  deposit,
  withdraw,
};
