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
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_SERVICE_A || "";
  const response = await httpClient().post(
    path,
    {
      ...withdrawDto,
    },
    {
      headers: {
        "x-api-key": apiKey,
      },
    }
  );
  return response.data;
};

export const TransactionServices = {
  deposit,
  withdraw,
};
