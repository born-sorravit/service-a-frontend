import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL || "";

const httpClient = (baseURL: string = url) => {
  const http = axios.create({
    baseURL,
  });

  return http;
};

export default httpClient;
