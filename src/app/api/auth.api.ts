import { IRegister } from "@/interfaces/register.interface";
import httpClient from "@/utils/httpClient";

const register = async (registerDto: IRegister) => {
  const response = await httpClient().post("/auth/register", {
    ...registerDto,
  });
  return response.data;
};

export const AuthServices = {
  register,
};
