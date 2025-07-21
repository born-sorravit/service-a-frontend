import httpClient from "@/utils/httpClient";

const getWallet = async (walletId: string) => {
  const path = `common/wallet/${walletId}`;
  const response = await httpClient().get(path);
  return response.data;
};

export const WalletServices = {
  getWallet,
};
