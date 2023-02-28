import { MovieList } from "@/components";
import { Spinner } from "@/UI";
import { api } from "@/utils/api";

export const FavoriteMoviesList = () => {
  const { data: favoriteMovies, isLoading } = api.movie.getFavorites.useQuery();
  return (
    <div className="flex h-full w-full justify-center pt-24">
      {!isLoading && favoriteMovies ? (
        <MovieList movies={favoriteMovies} />
      ) : (
        <Spinner fgColor="primary" bgColor="base-100" />
      )}
    </div>
  );
};
