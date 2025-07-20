import axios, { AxiosRequestHeaders } from "axios";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL || "";

const httpClient = (baseURL: string = url) => {
  const http = axios.create({
    baseURL,
  });

  http.interceptors.request.use(async (config: any) => {
    let token = undefined;
    if (typeof window !== "undefined") {
      token = (await cookies()).get("access_token");
    }

    if (token) {
      (config.headers as AxiosRequestHeaders).authorization = `Bearer ${token}`;
    }
    return config;
  });

  return http;
};

export default httpClient;
