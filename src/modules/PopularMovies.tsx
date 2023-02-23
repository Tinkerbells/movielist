import MovieCard from "@/components/MovieCard";
import { api } from "@/utils/api";
import { useKeenSlider } from "keen-slider/react";

const animation = { duration: 9000, easing: (t: number) => t };
const PopularMovies = () => {
  const { data: popularMovies, isLoading } = api.tmdb.popularMovies.useQuery();
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 6,
      spacing: 25,
    },
    loop: true,
    renderMode: "performance",
    drag: true,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    <>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div
          ref={sliderRef}
          className="keen-slider rounded-box mx-12 mt-24 flex w-full justify-self-start"
        >
          {popularMovies?.results.map((movie, index) => (
            <div
              className={`keen-slider__slide number-slide${index} cursor-grab`}
            >
              <MovieCard name={movie.title} image={movie.poster_path} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PopularMovies;
