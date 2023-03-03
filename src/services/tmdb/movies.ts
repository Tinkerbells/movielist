import { tmdbApi } from "@/api/tmdb";
import { Movie, MovieShort, TmdbResponse } from "@/types/tmdb";

const api = tmdbApi();

export const getPopularMovies = async () => {
  const res = await api.get<TmdbResponse<MovieShort>>("/movie/popular");
  return res.data;
};

export const getMovie = async (movieId: string) => {
  const res = await api.get<Movie>(`/movie/${movieId}`);
  return res.data;
};
