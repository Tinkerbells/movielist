import MovieCard from "@/components/MovieCard";
import { api } from "@/utils/api";
import { useKeenSlider } from "keen-slider/react";

const PopularMovies = () => {
  const { data: popularMovies, isLoading } = api.tmdb.popularMovies.useQuery();
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 7,
      spacing: 24,
    },
  });
  return (
    <>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div
          ref={ref}
          className="keen-slider gap-15 mx-8 mt-24 flex w-full place-self-start overflow-hidden"
        >
          {popularMovies?.results.map((movie, index) => (
            <div className={`keen-slider__slide number-slide${index}`}>
              <MovieCard name={movie.title} image={movie.poster_path} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PopularMovies;
