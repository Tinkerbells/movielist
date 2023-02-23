import { z } from "zod";
import { tmdbAxios } from "@/utils/tmdbAxios";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { Movie, TmdbResponse } from "@/types/tmdb";

const tmdbApi = tmdbAxios();

export const tmdbMovieRouter = createTRPCRouter({
  popularMovies: publicProcedure.query(async () => {
    const res = await tmdbApi.get<TmdbResponse<Movie>>("/movie/popular");
    return res.data;
  }),
});
