import { useLayoutStore } from "@/store/layoutStore";
import { Spinner } from "@/UI";
import { api, RouterOutputs } from "@/utils/api";
import { FC } from "react";
import MovieListItem from "../movie-list-item/MovieListItem";

interface IFavorite {
  isFavorite?: boolean;
}

type MovieType = Omit<
  RouterOutputs["movie"]["getFavorites"][0],
  "id" | "userId"
>;

export type MovieListItemType = MovieType & IFavorite;

interface MovieListProps {
  movies: MovieListItemType[];
}

export const MovieList: FC<MovieListProps> = ({ movies }) => {
  const isSidebarCollapsed = useLayoutStore(
    (state) => state.isSidebarCollapsed
  );
  const {
    data: favoriteMovies,
    isLoading,
    isFetching,
  } = api.movie.getFavorites.useQuery();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      {!isLoading && !isFetching ? (
        movies.map((movie) => (
          <MovieListItem
            key={movie.movieId}
            movieId={movie.movieId}
            title={movie.title}
            releaseDate={movie.releaseDate}
            overview={movie.overview}
            posterPath={movie.posterPath}
            isFavorite={
              !!favoriteMovies?.find((e) => e.movieId === movie.movieId)
            }
          />
        ))
      ) : (
        <Spinner className="place-self-center" />
      )}
    </div>
  );
};
