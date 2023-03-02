import { MovieList } from "@/components";
import { Spinner } from "@/UI";
import { api } from "@/utils/api";

export const LikedMovieList = () => {
  const { data: likedMovies, isLoading } = api.movie.getLiked.useQuery();
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
      {!isLoading && likedMovies ? (
        <MovieList movies={likedMovies} />
      ) : (
        <Spinner className="mb-24 place-self-center" />
      )}
    </div>
  );
};
