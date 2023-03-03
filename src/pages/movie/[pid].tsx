import { formatRuntime } from "@/helpers/formatRuntime";
import { IconProvider, Spinner } from "@/UI";
import { api } from "@/utils/api";
import { hasFlag } from "country-flag-icons";
import dayjs from "dayjs";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import fire from "@/assets/images/fire.png";
import Image from "next/image";

const MoviePage: NextPage = () => {
  const router = useRouter();
  const movieId = typeof router.query?.pid === "string" ? router.query.pid : "";
  const { data: movie, isLoading } = api.tmdb.getMovie.useQuery(
    { movieId: movieId },
    {
      enabled: movieId.length > 0,
    }
  );
  return (
    <div className="flex h-full w-full justify-center px-80">
      {!isLoading && movie ? (
        <div className="mt-24">
          <div className="flex gap-10">
            <div>
              <div className="indicator avatar">
                {movie.adult ? (
                  <span className="badge-error badge indicator-start indicator-item font-bold">
                    R
                  </span>
                ) : null}
                {movie.popularity > 660 ? (
                  <span className="bg-red indicator-item absolute right-0 m-1 font-bold">
                    <Image src={fire} alt="fire icon" width={40} />
                  </span>
                ) : null}
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.title}
                  className="max-w-xs rounded-lg shadow-2xl"
                />
              </div>
            </div>
            <section className="flex flex-col gap-8">
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <h1 className="flex items-end gap-10 text-4xl font-bold">
                    {movie.title} ({dayjs(movie.release_date).format("YYYY")})
                  </h1>
                  <p className="mt-1 flex text-info-content">
                    {dayjs(movie.release_date).format("MMM DD, YYYY")}
                    <div className="divider divider-horizontal"></div>
                    <span>{movie.status}</span>
                    <div className="divider divider-horizontal"></div>
                    <span>{formatRuntime(movie.runtime)}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 place-self-start font-bold">
                  <div
                    className="radial-progress border-4 border-primary bg-primary text-primary-content"
                    style={{
                      // @ts-ignore
                      "--value": movie.vote_average * 10,
                      "--size": "3.5rem",
                    }}
                  >
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <p className="text-lg">
                    TMDB <br />
                    rating
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <h2 className="text-lg font-bold">Production countries:</h2>
                {movie.production_countries.map((country) => (
                  <div
                    className="flex items-center gap-2"
                    key={country.iso_3166_1}
                  >
                    {hasFlag(country.iso_3166_1) ? (
                      <img
                        alt={country.name}
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`}
                        className="max-h-6 rounded-md"
                      />
                    ) : null}
                    <span className="text-lg">
                      {country.iso_3166_1}
                      {movie.production_countries.length > 1 && ","}
                    </span>
                  </div>
                ))}
                <h2 className="text-lg font-bold">Revenue: </h2>
                <p className="text-lg">${movie.revenue}</p>
              </div>
              <p>
                <span className="text-2xl font-bold">Overview</span>
                <br />
                {movie.overview}
              </p>
            </section>
          </div>
          <div>
            <div className="mt-4 flex gap-4">
              {movie.genres.slice(0, 3).map((genre) => (
                <div className="badge-outline badge p-3" key={genre.id}>
                  {genre.name}
                </div>
              ))}
            </div>
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
