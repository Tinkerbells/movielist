import { IconProvider, Spinner } from "@/UI";
import { api } from "@/utils/api";
import { hasFlag } from "country-flag-icons";
import dayjs from "dayjs";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
    <div className="flex h-full w-full justify-center px-80">
      {!isLoading && movie ? (
        <div className="mt-24">
          <div className="flex gap-10">
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
                  <div className="badge-outline badge p-3">{genre.name}</div>
                ))}
              </div>
            </figure>
            <section className="flex flex-col gap-5">
              <h1 className="mt-3 flex items-end gap-10 text-4xl font-bold">
                {movie.title} ({dayjs(movie.release_date).format("YYYY")})
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
              </h1>
              <p className="flex gap-2 text-2xl font-bold">
                Countries
                {movie.production_countries.map((country) => (
                  <figure className="flex items-center gap-2">
                    {hasFlag(country.iso_3166_1) ? (
                      <img
                        alt={country.name}
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`}
                        className="max-h-6 rounded-md"
                      />
                    ) : null}
                    <span className="text-lg">{country.iso_3166_1}</span>
                  </figure>
                ))}
              </p>
              <p>
                <span className="mb-2 text-2xl font-bold">Overview</span>
                <br />
                {movie.overview}
              </p>
            </section>
          </div>
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
