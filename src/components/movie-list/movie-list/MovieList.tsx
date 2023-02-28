import { useLayoutStore } from "@/store/layoutStore";
import { RouterOutputs } from "@/utils/api";
import { FC } from "react";
import MovieListItem from "../movie-list-item/MovieListItem";

export type MovieListItemType = Omit<
  RouterOutputs["movie"]["getFavorites"][0],
  "id" | "userId"
>;

interface MovieListProps {
  movies: MovieListItemType[];
}

export const MovieList: FC<MovieListProps> = ({ movies }) => {
  const isSidebarCollapsed = useLayoutStore(
    (state) => state.isSidebarCollapsed
  );
  return (
    <div className={`flex flex-col gap-8 ${isSidebarCollapsed && "ml-60"}`}>
      {movies.map((movie) => (
        <MovieListItem
          key={movie.movieId}
          movieId={movie.movieId}
          title={movie.title}
          releaseDate={movie.releaseDate}
          overview={movie.overview}
          posterPath={movie.posterPath}
        />
      ))}
    </div>
  );
};
