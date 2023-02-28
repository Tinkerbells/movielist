import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { Movie, TmdbResponse } from "@/types/tmdb";
import { tmdbApi } from "@/api";

const api = tmdbApi();

export const tmdbMovieRouter = createTRPCRouter({
  popularMovies: publicProcedure.query(async () => {
    const res = await api.get<TmdbResponse<Movie>>("/movie/popular");
    return res.data;
  }),
});
