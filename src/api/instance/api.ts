import type { AxiosInstance } from "axios";
import axios from "axios";
import { env } from "@/env.mjs";

interface ApiConstructorParams {
  baseUrl: string;
  params?: Record<string, string>;
}
export class API {
  public baseUrl: string;
  public params?: Record<string, string>;
  public request: AxiosInstance;

  constructor(options: ApiConstructorParams) {
    this.baseUrl = options.baseUrl;
    this.params = options.params;

    this.request = axios.create({
      baseURL: options.baseUrl,
      params: options.params,
    });
  }
}

export const tmdbApi = new API({
  baseUrl: "https://api.themoviedb.org/3",
  params: {
    api_key: env.TMDB_API_KEY,
  },
});
