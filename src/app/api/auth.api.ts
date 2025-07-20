import { IRegister } from "@/interfaces/register.interface";
import httpClient from "@/utils/httpClient";

const register = async (registerDto: IRegister) => {
  const path = `/common/users/register`;
  const response = await httpClient().post(path, {
    ...registerDto,
  });
  return response.data;
};

export const AuthServices = {
  register,
};
