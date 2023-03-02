import { FC } from "react";
import { MovieListItemType } from "@/types/movie";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { IconProvider } from "@/UI";
import Link from "next/link";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { formatReleaseDate } from "@/helpers/formatReleaseDate";

const MovieListItem: FC<MovieListItemType> = ({
  movieId,
  title,
  releaseDate,
  overview,
  posterPath,
  isLiked,
  rating,
}) => {
  const { data: sessionData } = useSession();

  const { refetch } = api.movie.getLiked.useQuery();

  const { mutate: addFavorite, isLoading: isAddLoading } =
    api.movie.setLiked.useMutation({
      onSuccess: async () => {
        await refetch();
      },
    });
  const { mutate: deleteFavorite, isLoading: isDeleteLoading } =
    api.movie.deleteLiked.useMutation({
      onSuccess: async () => {
        await refetch();
      },
    });

  const handleClick = () => {
    if (isLiked) {
      void deleteFavorite({
        movieId: movieId,
      });
    } else {
      void addFavorite({
        posterPath: posterPath,
        title: title,
        movieId: movieId,
        releaseDate: releaseDate,
        overview: overview,
        rating: rating,
      });
    }
  };

  return (
    <div
      className="card card-side h-52 w-5/6 bg-primary-content shadow-xl"
      // href="/"
    >
      <div className="absolute right-0 m-4">
        {sessionData ? (
          <button
            className={`group btn-circle btn border-none bg-opacity-50 ${
              (isAddLoading || isDeleteLoading) && "loading"
            }`}
            onClick={handleClick}
          >
            {!isAddLoading && !isDeleteLoading ? (
              <IconProvider
                className={`fill-${
                  isLiked
                    ? "red-600 group-hover:fill-white"
                    : "white group-hover:fill-red-600"
                } transition duration-200 ease-in-out`}
                size="2rem"
              >
                <AiFillHeart />
              </IconProvider>
            ) : null}
          </button>
        ) : null}
      </div>
      <div>
        <figure className="h-full w-36">
          <img
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt="Movie"
            className="h-full rounded-l-2xl"
          />
        </figure>
      </div>
      <div className="card-body py-5">
        <h2 className="card-title">
          {title}
          <span className="flex items-center gap-1 text-base font-bold">
            <IconProvider className="fill-yellow-400" size="1.25rem">
              <AiFillStar />
            </IconProvider>
            {rating}
          </span>
        </h2>
        <p className="text-info-content">{formatReleaseDate(releaseDate)}</p>
        <p>{overview}</p>
      </div>
    </div>
  );
};
export default MovieListItem;
