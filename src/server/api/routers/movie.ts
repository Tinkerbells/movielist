import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const movieRouter = createTRPCRouter({
  addFavorite: protectedProcedure
    .input(
      z.object({
        movieId: z.number(),
        title: z.string(),
        posterPath: z.string(),
        releaseDate: z.string(),
        overview: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.favorite.create({
        data: {
          movieId: input.movieId,
          title: input.title,
          posterPath: input.posterPath,
          releaseDate: input.releaseDate,
          overview: input.overview,
        },
      });
    }),
  deleteFavorite: protectedProcedure
    .input(
      z.object({
        movieId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.favorite.deleteMany({
        where: {
          movieId: input.movieId,
        },
      });
    }),
  getFavorites: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.favorite.findMany();
  }),

  findFavorite: protectedProcedure
    .input(z.object({ movieId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.favorite.findFirst({
        where: { movieId: input.movieId },
      });
    }),
});
