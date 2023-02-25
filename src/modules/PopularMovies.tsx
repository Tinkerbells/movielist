import MovieCard from "@/components/MovieCard";
import { useLayoutStore } from "@/store/layoutStore";
import { api } from "@/utils/api";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";

const animation = { duration: 2000, easing: (t: number) => t };

const PopularMovies = () => {
  const { data: popularMovies, isLoading } = api.tmdb.popularMovies.useQuery();
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const isSidebarCollapsed = useLayoutStore(
    (state) => state.isSidebarCollapsed
  );
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 5, spacing: 10 },
      },
      "(min-width: 1600px)": {
        slides: { perView: 6, spacing: 10 },
      },
      "(min-width: 1800px)": {
        slides: { perView: 8, spacing: 14 },
      },
      "(min-width: 2000px)": {
        slides: { perView: 9, spacing: 18 },
      },
      "(min-width: 2200px)": {
        slides: { perView: 10, spacing: 18 },
      },
    },
    loop: true,
    renderMode: "performance",
    drag: !autoPlay,
    created: (s) =>
      s.moveToIdx(s.track.details.abs + (autoPlay ? 1 : 0), true, animation),
    updated: (s) =>
      s.moveToIdx(s.track.details.abs + (autoPlay ? 1 : 0), true, animation),
    animationEnded: (s) =>
      s.moveToIdx(s.track.details.abs + (autoPlay ? 1 : 0), true, animation),
  });

  const handleChecked = () => {
    slider.current?.update();
    setAutoPlay(!autoPlay);
  };

  useEffect(() => {
    slider.current?.update();
    if (slider.current && !autoPlay) {
      slider.current.animator.stop();
      slider.current.options.animationEnded = () => {};
    }
    if (slider.current && autoPlay) {
      slider.current.options.animationEnded = (s) =>
        s.moveToIdx(s.track.details.abs + 1, true, animation);
    }
  }, [autoPlay, isSidebarCollapsed]);

  return (
    <>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div
          className={`mt-24 flex flex-col gap-4 ${
            isSidebarCollapsed && "ml-60"
          }`}
        >
          <div className="flex w-full justify-between">
            <h2 className="ml-4 text-2xl font-bold">What's Popular</h2>
            <div className="mr-4 flex gap-3">
              <label htmlFor="autoplay">Toggle autoplay</label>
              <input
                id="autoplay"
                type="checkbox"
                className="toggle"
                checked={autoPlay}
                onChange={handleChecked}
              />
            </div>
          </div>
          <div
            ref={sliderRef}
            className="keen-slider mx-5 flex overflow-hidden rounded-xl"
          >
            {popularMovies?.results.map((movie, index) => (
              <div
                className={`keen-slider__slide number-slide${index}`}
                key={movie.id}
              >
                <MovieCard name={movie.title} image={movie.poster_path} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PopularMovies;
