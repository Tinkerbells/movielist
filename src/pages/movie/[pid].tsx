import { formatRuntime } from "@/helpers/formatRuntime";
import { formatRevenue } from "@/helpers/formatRevenue";
import { Spinner } from "@/UI";
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
        <div className="mt-28">
          <div className="flex flex-col gap-10 md:flex-row">
            <section className="flex flex-col">
              <div className="indicator avatar">
                {movie.adult ? (
                  <span className="indicator-start badge-error badge indicator-item font-bold">
                    R
                  </span>
                ) : null}
                {movie.popularity > 660 ? (
                  <span className="bg-red indicator-item absolute right-0 m-1 font-bold">
                    <div
                      className="tooltip tooltip-right"
                      data-tip="Popular movie"
                    >
                      <button>
                        <Image src={fire} alt="fire icon" width={35} />
                      </button>
                    </div>
                  </span>
                ) : null}
                <figure>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt={movie.title}
                    className="max-w-sm rounded-lg shadow-2xl"
                  />
                </figure>
              </div>
              <div className="mt-2 flex gap-4">
                {movie.genres.slice(0, 4).map((genre) => (
                  <div
                    className="badge-outline badge p-3 text-xs"
                    key={genre.id}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </section>
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
                    <span>{formatRuntime(movie.runtime!!) || "??"}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 place-self-start font-bold">
                  <div
                    className="radial-progress border-8 border-base-300 bg-base-300 text-primary"
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
                <h2 className="text-lg font-bold">Production companies</h2>
                <div className="flex gap-4">
                  {movie.production_companies.map((company) => (
                    <div key={company.id} className="grid place-items-center">
                      {company.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w300/${company.logo_path}`}
                          className="max-h-10"
                        />
                      ) : (
                        <p>{company.name}</p>
                      )}
                    </div>
                  ))}
                </div>
                <h2 className="text-lg font-bold">Production countries:</h2>
                <div className="flex">
                  {movie.production_countries.map((country) => (
                    <div
                      className="mr-12 flex items-center gap-2"
                      key={country.iso_3166_1}
                    >
                      {hasFlag(country.iso_3166_1) ? (
                        <img
                          alt={country.name}
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`}
                          className="h-5 rounded-md"
                        />
                      ) : null}
                      <span className="text-lg">{country.iso_3166_1}</span>
                    </div>
                  ))}
                </div>
                <h2 className="text-lg font-bold">Revenue: </h2>
                <p className="text-lg">
                  {movie.revenue === 0 ? "??" : formatRevenue(movie.revenue)}
                </p>
              </div>
              <p>
                <span className="text-2xl font-bold">Overview</span>
                <br />
                {movie.overview}
              </p>
            </section>
          </div>
          <div></div>
        </div>
      ) : (
        <Spinner className="place-self-center" />
      )}
    </div>
  );
};

export default MoviePage;
