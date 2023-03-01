import { MovieList } from "@/components";
import { useLayoutStore } from "@/store/layoutStore";
import { Spinner } from "@/UI";
import { api } from "@/utils/api";

export const FavoriteMoviesList = () => {
  const { data: favoriteMovies, isLoading } = api.movie.getFavorites.useQuery();
  // const { data: favoriteMovies, isLoading } = api.tmdb.popularMovies.useQuery(
  //   undefined,
  //   {
  //     select: (data) =>
  //       data.results.map((e) => {
  //         return {
  //           movieId: e.id,
  //           title: e.title,
  //           releaseDate: e.release_date,
  //           overview: e.overview,
  //           posterPath: e.poster_path,
  //         };
  //       }),
  //   }
  // );

  return (
    <div className="flex h-full w-full justify-center py-24">
      {!isLoading && favoriteMovies ? (
        <MovieList movies={favoriteMovies} />
      ) : (
        <Spinner className="mb-24 place-self-center" />
      )}
    </div>
  );
};
