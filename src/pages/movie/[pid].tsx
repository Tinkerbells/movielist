import { IconProvider, Spinner } from "@/UI";
import { api } from "@/utils/api";
import dayjs from "dayjs";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

const MoviePage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { data: movie, mutate, isLoading } = api.tmdb.getMovie.useMutation();
  useEffect(() => {
    if (pid) {
      mutate({ movieId: pid as string });
    }
  }, [pid]);

  return (
    <div className="flex h-full w-full flex-col px-20">
      {!isLoading && movie ? (
        <div className="min-h-screen p-24">
          <section className="flex gap-10">
            <figure>
              {movie.adult ? (
                <div className="badge-error badge absolute m-3 ">R</div>
              ) : null}
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="max-w-xs rounded-lg shadow-2xl"
              />
              <div className="mt-4 flex gap-4">
                {movie.genres.slice(0, 3).map((genre) => (
                  <div className="badge-outline badge p-4">{genre.name}</div>
                ))}
              </div>
            </figure>
            <div className="flex flex-col gap-10">
              <div className="flex items-end gap-32">
                <h1 className="mt-3 text-4xl font-bold">
                  {movie.title} ({dayjs(movie.release_date).format("YYYY")})
                </h1>
                <div className="flex flex-col gap-1">
                  <p className="text-xl text-base-content">TMDB rating</p>
                  <div className="flex items-center gap-1">
                    <IconProvider className="fill-yellow-400" size="2rem">
                      <AiFillStar />
                    </IconProvider>
                    <p className="text-2xl font-bold">
                      {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="mb-2 text-2xl font-bold">Overview</h2>
                <p>{movie.overview}</p>
              </div>
            </div>
          </section>
          <div>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn-primary btn">Get Started</button>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MoviePage;
