import { SearchMovies } from "@/modules/search-movies";
import { api } from "@/utils/api";
import { NextPage } from "next";
import { useRouter } from "next/router";

const SearchMoviesPage: NextPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const searchQuery = typeof query === "string" ? query : "";
  const { data, isLoading } = api.tmdb.searchMovie.useQuery(
    { query: searchQuery },
    {
      enabled: searchQuery.length > 0,
      select: (data) =>
        data.results.map((e) => {
          return {
            movieId: e.id,
            title: e.title,
            releaseDate: e.release_date,
            overview: e.overview,
            posterPath: e.poster_path,
            rating: e.vote_average,
          };
        }),
    }
  );

  return (
    <div className="flex flex-col">
      {data ? <SearchMovies movies={data} isLoading={isLoading} /> : null}
    </div>
  );
};

export default SearchMoviesPage;
