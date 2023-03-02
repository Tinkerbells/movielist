import { Movie, TmdbResponse } from "@/types/tmdb";
import { tmdbApi } from "./api";

const api = tmdbApi();

export const getPopularMovies = async () => {
  const res = await api.get<TmdbResponse<Movie>>("/movie/popular");
  return res.data;
};
