import { formatReleaseDate } from "@/helpers/formatReleaseDate";
import { IconProvider } from "@/UI";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { MovieListItemType } from "../movie-list/MovieList";
const MovieListItem: FC<MovieListItemType> = ({
  movieId,
  title,
  releaseDate,
  overview,
  posterPath,
  isFavorite,
}) => {
  const { data: sessionData } = useSession();

  const { refetch } = api.movie.getFavorites.useQuery();

  const { mutate: addFavorite, isLoading: isAddLoading } =
    api.movie.addFavorite.useMutation({
      onSuccess: async () => {
        await refetch();
      },
    });
  const { mutate: deleteFavorite, isLoading: isDeleteLoading } =
    api.movie.deleteFavorite.useMutation({
      onSuccess: async () => {
        await refetch();
      },
    });

  const handleClick = () => {
    if (isFavorite) {
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
                  isFavorite
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
        <h2 className="card-title">{title}</h2>
        <p className="text-info-content">{formatReleaseDate(releaseDate)}</p>
        <p>{overview}</p>
      </div>
    </div>
  );
};
export default MovieListItem;
