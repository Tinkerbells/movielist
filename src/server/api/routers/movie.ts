import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const movieRouter = createTRPCRouter({
  setLiked: protectedProcedure
    .input(
      z.object({
        movieId: z.number(),
        title: z.string(),
        posterPath: z.string(),
        releaseDate: z.string(),
        overview: z.string(),
        rating: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.likedMovie.create({
        data: {
          movieId: input.movieId,
          title: input.title,
          posterPath: input.posterPath,
          releaseDate: input.releaseDate,
          overview: input.overview,
          rating: input.rating,
        },
      });
    }),
  deleteLiked: protectedProcedure
    .input(
      z.object({
        movieId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.likedMovie.deleteMany({
        where: {
          movieId: input.movieId,
        },
      });
    }),
  getLiked: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.likedMovie.findMany();
  }),
});
