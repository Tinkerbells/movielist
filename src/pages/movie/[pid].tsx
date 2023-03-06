import { formatRuntime } from "@/helpers/formatRuntime";
import { formatRevenue } from "@/helpers/formatRevenue";
import { Spinner, TMDBImageLoader } from "@/UI";
import { api } from "@/utils/api";
import { hasFlag } from "country-flag-icons";
import dayjs from "dayjs";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import fire from "@/assets/images/fire.png";
import Image from "next/image";
import Link from "next/link";
import { getPersonByJob } from "@/helpers/getPersonByJob";
import { Carousel } from "@/components";

const MoviePage: NextPage = () => {
  const router = useRouter();
  const movieId = typeof router.query?.pid === "string" ? router.query.pid : "";
  const { data: movie, isLoading: isMovieLoading } = api.tmdb.getMovie.useQuery(
    { movieId: movieId },
    {
      enabled: movieId.length > 0,
    }
  );

  const { data: credits, isLoading: isCreditsLoading } =
    api.tmdb.getCredits.useQuery(
      { movieId: movieId },
      {
        enabled: movieId.length > 0,
      }
    );
  return (
    <div className="h-full w-full px-48">
      {!isMovieLoading && !isCreditsLoading && credits && movie ? (
        <div className="min-h-screen px-10 pt-28">
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
                  <Image
                    src={movie.poster_path!!}
                    alt={movie.title}
                    width={500}
                    height={500}
                    className="max-w-[300px] rounded-lg"
                    loader={TMDBImageLoader}
                  />
                </figure>
              </div>
              <div className="mt-3 flex gap-4">
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
              <div className="grid grid-cols-2 gap-5">
                <h2 className="text-lg font-bold">Production companies:</h2>
                <div className="flex gap-4">
                  {movie.production_companies.map((company) => (
                    <div key={company.id} className="grid place-items-center">
                      {company.logo_path ? (
                        <div className="tooltip" data-tip={company.name}>
                          <img
                            src={`https://image.tmdb.org/t/p/w300/${company.logo_path}`}
                            className="max-h-10"
                          />
                        </div>
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
                        <div className="tooltip" data-tip={country.name}>
                          <img
                            alt={country.name}
                            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`}
                            className="h-5 rounded-md"
                          />
                        </div>
                      ) : null}
                      <span className="text-lg">{country.iso_3166_1}</span>
                    </div>
                  ))}
                </div>
                <h2 className="text-lg font-bold">Revenue:</h2>
                <p className="text-lg">
                  {movie.revenue === 0 ? "??" : formatRevenue(movie.revenue)}
                </p>
                {getPersonByJob(credits.crew, "director").name && (
                  <>
                    <h2 className="text-lg font-bold">Director:</h2>
                    <Link href="/" className="text-lg hover:underline">
                      {getPersonByJob(credits.crew, "director").name}
                    </Link>
                  </>
                )}
                {getPersonByJob(credits.crew, "writer").name && (
                  <>
                    <h2 className="text-lg font-bold">Writer:</h2>
                    <Link href="/" className="text-lg hover:underline">
                      {getPersonByJob(credits.crew, "writer").name}
                    </Link>
                  </>
                )}
                {getPersonByJob(credits.crew, "director of photography")
                  .name && (
                  <>
                    <h2 className="text-lg font-bold">Camera operator:</h2>
                    <Link href="/" className="text-lg hover:underline">
                      {
                        getPersonByJob(credits.crew, "director of photography")
                          .name
                      }
                    </Link>
                  </>
                )}
              </div>
              <p>
                <span className="text-2xl font-bold">Overview</span>
                <br />
                {movie.overview}
              </p>
            </section>
          </div>
          <div className="mt-8 flex w-full flex-col gap-4">
            <h2 className="text-2xl font-bold">Cast</h2>
            <Carousel autoplay={false} drag={true} loop={false}>
              {credits.cast.map((actor, index) => (
                <div
                  className={`keen-slider__slide number-slide${index}`}
                  key={actor.id}
                >
                  <div className="card glass overflow-hidden">
                    <figure className="p-2.5">
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                        width={300}
                        height={200}
                        alt={actor.name}
                        className="rounded-box"
                      />
                    </figure>
                    <div className="card-body flex h-24 flex-col px-4 py-0">
                      <p className="card-title text-base 2xl:text-sm">
                        {actor.name}
                      </p>
                      <p className="text-sm">{actor.character}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      ) : (
        <Spinner global={true} />
      )}
    </div>
  );
};

export default MoviePage;
