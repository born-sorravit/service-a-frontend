import { ICurrency } from "@/interfaces/currency.interface";
import { IUserInfo } from "@/interfaces/user.interface";

export interface ICurrencyState {
  currency: ICurrency[];
}

export interface ICurrencyStore extends ICurrencyState {
  setCurrency: (currency: ICurrency[]) => void;
  reset: () => void;
}
