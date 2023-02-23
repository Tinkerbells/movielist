import { z } from "zod";
import { tmdbAxios } from "@/utils/tmdbAxios";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

const tmdbApi = tmdbAxios();

export const tmdbMovieRouter = createTRPCRouter({
  popularMovies: publicProcedure.query(async () => {
    const res = await tmdbApi.get("/movie/popular");
    return res.data;
  }),
});
