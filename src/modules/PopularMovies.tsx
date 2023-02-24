import MovieCard from "@/components/MovieCard";
import { api } from "@/utils/api";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";

const animation = { duration: 1500, easing: (t: number) => t };

const PopularMovies = () => {
  const { data: popularMovies, isLoading } = api.tmdb.popularMovies.useQuery();
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
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
        slides: { perView: 7, spacing: 20 },
      },
    },
    loop: true,
    renderMode: "performance",
    drag: true,
    created: (s) => s.moveToIdx(s.track.details.abs + 1, true, animation),
    updated: (s) =>
      autoPlay && s.moveToIdx(s.track.details.abs + 1, true, animation),
    animationEnded: (s) =>
      s.moveToIdx(s.track.details.abs + 1, true, animation),
  });

  const handleChecked = () => {
    slider.current?.update();
    setAutoPlay(!autoPlay);
  };

  useEffect(() => {
    if (slider.current && !autoPlay) {
      slider.current.animator.stop();
      slider.current.options.animationEnded = () => {};
    }
    if (slider.current && autoPlay) {
      slider.current.options.animationEnded = (s) =>
        s.moveToIdx(s.track.details.abs + 1, true, animation);
    }
  }, [autoPlay]);

  return (
    <>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="mt-24 flex w-full flex-col gap-6 px-5">
          <div className="flex w-full justify-between">
            <h2 className="ml-2 text-2xl font-bold">What's Popular</h2>
            <div className="flex gap-3">
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
          <div ref={sliderRef} className="keen-slider flex justify-self-start ">
            {popularMovies?.results.map((movie, index) => (
              <div
                className={`keen-slider__slide number-slide${index} cursor-grab`}
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
