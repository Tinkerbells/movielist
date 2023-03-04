import { MovieCard } from "@/components";
import { useLayoutStore } from "@/store/layoutStore";
import { Spinner } from "@/UI";
import { api } from "@/utils/api";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";

export const PopularMoviesSlider = () => {
  const { data: popularMovies, isLoading: isPopularMoviesLoading } =
    api.tmdb.getPopularMovies.useQuery();

  const { data: likedMovies, isLoading: isLikedMoviesLoading } =
    api.movie.getLiked.useQuery();

  const [isDragged, setIsDragged] = useState<boolean>(false);

  const isSidebarCollapsed = useLayoutStore(
    (state) => state.isSidebarCollapsed
  );

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 5 },
        },
        "(min-width: 768px)": {
          slides: { perView: 3, spacing: 5 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 4, spacing: 10 },
        },
        "(min-width: 1280px)": {
          slides: { perView: 5, spacing: 10 },
        },
        "(min-width: 1536px)": {
          slides: { perView: 6, spacing: 10 },
        },
        "(min-width: 1800px)": {
          slides: { perView: 7, spacing: 10 },
        },
        "(min-width: 2560px)": {
          slides: { perView: 8, spacing: 10 },
        },
      },
      loop: true,
      renderMode: "performance",
      drag: true,
      dragStarted: () => {
        setIsDragged(true);
      },
      dragEnded: () => {
        setIsDragged(false);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            if (!slider && !popularMovies) return;
            slider.next();
          }, 750);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  useEffect(() => {
    slider?.current?.update();
  }, [isSidebarCollapsed, popularMovies, likedMovies]);

  return (
    <div className="mt-24 flex flex-col gap-4">
      <div className="flex w-full justify-between">
        <h2 className="ml-4 text-2xl font-bold">What's Popular</h2>
      </div>
      {!isPopularMoviesLoading &&
      !isLikedMoviesLoading &&
      likedMovies &&
      popularMovies &&
      slider ? (
        <div
          ref={sliderRef}
          className="keen-slider rounded-box mx-4 flex overflow-hidden"
        >
          {popularMovies?.results.map((movie, index) => (
            <div
              className={`keen-slider__slide number-slide${index} ${
                isDragged ? "cursor-grabbing" : "cursor-pointer"
              } px-1`}
              key={movie.id}
            >
              <MovieCard
                posterPath={movie.poster_path}
                title={movie.title}
                movieId={movie.id}
                isLiked={!!likedMovies?.find((e) => e.movieId == movie.id)}
                overview={movie.overview}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                variant="vertical"
              />
            </div>
          ))}
        </div>
      ) : (
        <Spinner className="mt-40 place-self-center" />
      )}
    </div>
  );
};
