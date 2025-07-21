import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ICurrency } from "@/interfaces/currency.interface";
import { ICurrencyState, ICurrencyStore } from "./currency.type";

const initialState: ICurrencyState = {
  currency: [] as ICurrency[],
};

export const useCurrencyStore = create<ICurrencyStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCurrency(currency) {
        set(() => ({
          currency,
        }));
      },
      reset: () => {
        set(() => ({
          ...initialState,
        }));
      },
    }),
    {
      name: "currency-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
