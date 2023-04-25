import { MovieList } from "@/components";
import { MovieCardType } from "@/types/movie";
import { Spinner } from "@/UI";
import { FC } from "react";
interface SearchMoviesProps {
  movies: MovieCardType[];
  isLoading: boolean;
}
export const SearchMovies: FC<SearchMoviesProps> = ({ movies, isLoading }) => {
  return (
    <div className="flex h-full w-full justify-center py-24">
      {!isLoading && movies ? (
        <MovieList movies={movies} />
      ) : (
        <Spinner className="mb-24 place-self-center" />
      )}
    </div>
  );
};
