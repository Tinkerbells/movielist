import { Spinner } from "@/UI";
import { api } from "@/utils/api";
import { FC } from "react";
import { motion } from "framer-motion";
import { MovieCardType } from "@/types/movie";
import { MovieCard } from "@/components/movie-card/MovieCard";

interface MovieListProps {
  movies: MovieCardType[];
}

export const MovieList: FC<MovieListProps> = ({ movies }) => {
  const { data: likedMovies, isLoading } = api.movie.getLiked.useQuery();

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8"
      layout
    >
      {movies.length === 0 ? (
        <div>None liked movies</div>
      ) : (
        <>
          {!isLoading ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.movieId}
                movieId={movie.movieId}
                title={movie.title}
                releaseDate={movie.releaseDate}
                overview={movie.overview}
                posterPath={movie.posterPath}
                rating={movie.rating}
                isLiked={
                  !!likedMovies?.find((e) => e.movieId === movie.movieId)
                }
                variant="horizontal"
              />
            ))
          ) : (
            <Spinner />
          )}
        </>
      )}
    </motion.div>
  );
};
