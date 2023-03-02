import { MovieListItemType } from "@/types/movie";
import { Spinner } from "@/UI";
import { api } from "@/utils/api";
import { FC } from "react";
import MovieListItem from "../movie-list-item/MovieListItem";
import { motion } from "framer-motion";

interface MovieListProps {
  movies: MovieListItemType[];
}

export const MovieList: FC<MovieListProps> = ({ movies }) => {
  const { data: likedMovies, isLoading } = api.movie.getLiked.useQuery();

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8"
      layout
    >
      {movies.length === 0 ? (
        <div>Zero favorites movies</div>
      ) : (
        <>
          {!isLoading ? (
            movies.map((movie) => (
              <MovieListItem
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
              />
            ))
          ) : (
            <Spinner className="place-self-center" />
          )}
        </>
      )}
    </motion.div>
  );
};
