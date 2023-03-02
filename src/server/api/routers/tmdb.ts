import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { getPopularMovies } from "@/api/tmdb";

export const tmdbMovieRouter = createTRPCRouter({
  getPopularMovies: publicProcedure.query(async () => {
    return getPopularMovies();
  }),
});
