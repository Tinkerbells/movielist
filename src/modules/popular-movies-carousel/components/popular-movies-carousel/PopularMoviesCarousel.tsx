import { Carousel, MovieCard } from "@/components";
import { Spinner } from "@/UI";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const PopularMoviesCarousel = () => {
  const { data: sessionData } = useSession();
  const { data: popularMovies, isLoading: isPopularMoviesLoading } =
    api.tmdb.getPopularMovies.useQuery();

  const { data: likedMovies } = api.movie.getLiked.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const [isDragged, setIsDragged] = useState<boolean>(false);

  return (
    <div className="mt-24 flex flex-col place-items-center gap-4 px-24">
      <div className="flex w-full justify-between">
        <h2 className="ml-4 text-2xl font-bold">What's Popular</h2>
      </div>
      {!isPopularMoviesLoading && popularMovies ? (
        <Carousel autoplay={true} setIsDragged={setIsDragged} drag={true} loop={true}>
          {popularMovies?.results.map((movie, index) => (
            <div
              className={`keen-slider__slide number-slide${index} ${
                isDragged ? "cursor-grabbing" : "cursor-pointer"
              } px-1`}
              key={movie.id}
            >
              <MovieCard
                posterPath={movie.poster_path!!}
                title={movie.title}
                movieId={movie.id}
                isLiked={
                  likedMovies
                    ? !!likedMovies.find((e) => e.movieId == movie.id)
                    : false
                }
                overview={movie.overview}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                variant="vertical"
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <Spinner className="place-self-center" />
      )}
    </div>
  );
};
