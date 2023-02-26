import IconProvider from "@/UI/IconProvider";
// import Image from "next/image";
import { FC, useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { motion, useMotionValue } from "framer-motion";
import { api } from "@/utils/api";
import { formatReleaseDate } from "@/utils/format";

interface MovieCardProps {
  posterPath: string;
  title: string;
  movieId: number;
  isFavorite?: boolean;
  releaseDate: string;
  rating: number;
}

const MovieCard: FC<MovieCardProps> = ({
  posterPath,
  title,
  movieId,
  isFavorite,
  releaseDate,
  rating,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(isFavorite || false);
  const x = useMotionValue(0);
  const addFavorite = api.movie.addFavorite.useMutation();
  const deleteFavorite = api.movie.deleteFavorite.useMutation();

  const handleAddFavorite = () => {
    setIsLiked(true);
    void addFavorite.mutate({
      posterPath: posterPath,
      title: title,
      movieId: movieId,
    });
  };

  const handleRemoveFavorite = () => {
    setIsLiked(false);
    void deleteFavorite.mutate({
      movieId: movieId,
    });
  };

  return (
    <div className="card glass relative overflow-hidden pb-3">
      {/* TODO replace with nextjs Image tag  */}
      {isLiked ? (
        <button
          onClick={handleRemoveFavorite}
          className="absolute flex h-full w-full justify-center"
        >
          <motion.div
            initial={{ scale: 0, x: "100%", y: "-100%" }}
            animate={{ scale: 1, x: 0, y: "100%" }}
            className="mt-[40%]"
          >
            <IconProvider
              className="fill-red-600 transition duration-200 ease-in-out hover:fill-white"
              size="3.75rem"
            >
              <AiFillHeart />
            </IconProvider>
          </motion.div>
        </button>
      ) : (
        <button
          className="group btn-circle btn absolute right-0 m-4 border-none bg-base-100 bg-opacity-50"
          onClick={handleAddFavorite}
        >
          <IconProvider
            className="fill-red-white transition duration-200 ease-in-out group-hover:fill-red-600"
            size="1.75rem"
          >
            <AiFillHeart />
          </IconProvider>
        </button>
      )}
      <figure className="p-2.5">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className={`rounded-box h-full w-full ${
            isLiked && "z-[-1] brightness-50"
          }`}
        />
      </figure>
      <div className="card-body flex h-24 flex-col px-4 py-2">
        <p className="card-title lg:text-base 2xl:text-lg">{title}</p>
        <p className="lg:text-base 2xl:text-base">
          {formatReleaseDate(releaseDate)}
        </p>
      </div>
      <div className="absolute bottom-0 right-0 my-3 mx-0 flex items-center gap-1 px-3 text-base font-bold">
        <IconProvider className="fill-yellow-400" size="1.25rem">
          <AiFillStar />
        </IconProvider>
        {rating}
      </div>
    </div>
  );
};

export default MovieCard;
