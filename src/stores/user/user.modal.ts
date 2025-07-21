import { IUserInfo } from "@/interfaces/user.interface";
import { IUserState, IUserStore } from "./user.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { WalletServices } from "@/app/api/wallet.api";
import { IResponse } from "@/interfaces/response.interface";
import { IWalletResponse } from "@/interfaces/wallet.interface";

const initialState: IUserState = {
  user: {} as IUserInfo,
};

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUser: (user: IUserInfo) => {
        set(() => ({
          user,
        }));
      },
      refetch: async () => {
        const user = get().user;
        const walletId = user.wallet?.id;

        if (!walletId) return;

        const wallet = (await WalletServices.getWallet(
          walletId
        )) as IResponse<IWalletResponse>;
        console.log({ wallet });

        if (!wallet.data) return;
        set(() => ({
          user: {
            ...user,
            wallet: {
              ...wallet.data!,
            },
          },
        }));
      },
      reset: () => {
        set(() => ({
          ...initialState,
        }));
      },
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
