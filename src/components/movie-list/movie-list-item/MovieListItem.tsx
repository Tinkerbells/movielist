import { formatReleaseDate } from "@/helpers/formatReleaseDate";
import { IconProvider, Spinner } from "@/UI";
import { api } from "@/utils/api";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
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
  const [isLiked, setIsLiked] = useState(isFavorite);

  const { refetch } = api.movie.getFavorites.useQuery();

  const addFavorite = api.movie.addFavorite.useMutation({
    onSuccess: () => void refetch(),
  });
  const deleteFavorite = api.movie.deleteFavorite.useMutation({
    onSuccess: () => void refetch(),
  });

  const handleClick = () => {
    if (isLiked) {
      void deleteFavorite.mutate({
        movieId: movieId,
      });
    } else {
      void addFavorite.mutate({
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
            className="group btn-circle btn border-none bg-opacity-50"
            onClick={handleClick}
          >
            <IconProvider
              className={`fill-${
                isLiked
                  ? "red-600 group-hover:fill-white"
                  : "white group-hover:fill-red-600"
              } transition duration-200 ease-in-out`}
              size="2rem"
            >
              {}
              <AiFillHeart />
            </IconProvider>
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
