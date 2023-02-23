import { TMDB_URL } from "@/consts/urls";
import { env } from "@/env.mjs";
import axios from "axios";

export const tmdbAxios = () => {
  return axios.create({
    baseURL: TMDB_URL,
    params: {
      api_key: env.TMDB_API_KEY,
    },
  });
};
