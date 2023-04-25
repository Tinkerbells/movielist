import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  getCredits,
  getMovie,
  getPopularMovies,
  searchMovie,
} from "@/services/tmdb";

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
    .query(async ({ input }) => {
      return getMovie(input.movieId);
    }),
  searchMovie: publicProcedure
    .input(
      z.object({
        query: z.string(),
      })
    )
    .query(async ({ input }) => {
      return searchMovie(input.query);
    }),
  getCredits: publicProcedure
    .input(
      z.object({
        movieId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const credits = await getCredits(input.movieId);
      credits.cast = credits.cast.sort((a, b) => b.popularity - a.popularity);
      credits.cast = credits.cast.filter((actor) => !!actor.profile_path);
      return credits;
    }),
});
