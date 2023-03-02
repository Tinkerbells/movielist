// import Image from "next/image";
import { FC, useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";
import { api } from "@/utils/api";
import { formatReleaseDate } from "@/helpers/formatReleaseDate";
import { IconProvider, Spinner } from "@/UI";
import { useSession } from "next-auth/react";

interface PopularMovieCardProps {
  posterPath: string;
  title: string;
  movieId: number;
  isFavorite?: boolean;
  releaseDate: string;
  rating: number;
  overview: string;
}

const PopularMovieCard: FC<PopularMovieCardProps> = ({
  posterPath,
  title,
  movieId,
  isFavorite,
  releaseDate,
  rating,
  overview,
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
      className="card glass overflow-hidden pb-3"
      onClick={() => console.log("clicked")}
    >
      {/* TODO replace with nextjs Image tag  */}
      {sessionData && (
        <div className="absolute h-full w-full">
          <motion.div
            initial={{ x: "100%", y: 0 }}
            animate={{
              x: isFavorite ? 0 : "100%",
              y: isFavorite ? "30%" : 0,
            }}
            className="flex h-full w-full flex-col"
          >
            <button
              className={`${
                isFavorite
                  ? "place-self-center"
                  : "group btn-circle btn -ml-16 mt-4 border-none bg-opacity-50"
              } ${
                (isDeleteLoading || isAddLoading) && "loading btn-circle btn"
              }`}
              onClick={handleClick}
            >
              <IconProvider
                className={`${
                  isFavorite
                    ? "fill-red-600  hover:fill-white"
                    : "fill-white group-hover:fill-red-600"
                } transition duration-200 ease-in-out ${
                  (isDeleteLoading || isAddLoading) && "hidden"
                }`}
                size={`${isFavorite ? "3.75rem" : "1.75rem"}`}
              >
                <AiFillHeart />
              </IconProvider>
            </button>
          </motion.div>
        </div>
      )}
      <figure className="p-2.5">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className={`rounded-box h-full w-full ${
            isFavorite && "z-[-1] brightness-50"
          }`}
        />
      </figure>
      <div className="card-body flex h-24 flex-col px-4 py-2">
        <p className="2xl:text-sm card-title text-base">{title}</p>
        <p className="text-sm">{formatReleaseDate(releaseDate)}</p>
      </div>
      <div className="absolute bottom-0 right-0 my-3 mx-0 flex items-center gap-1 px-3 text-sm font-bold">
        <IconProvider className="fill-yellow-400" size="1.25rem">
          <AiFillStar />
        </IconProvider>
        {rating}
      </div>
    </div>
  );
};

export default PopularMovieCard;
