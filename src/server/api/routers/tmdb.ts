import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { getMovie, getPopularMovies } from "@/services/tmdb";

export const tmdbMovieRouter = createTRPCRouter({
  getPopularMovies: publicProcedure.query(async () => {
    return getPopularMovies();
  }),
  getMovie: publicProcedure
    .input(
      z.object({
        movieId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return getMovie(input.movieId);
    }),
});
