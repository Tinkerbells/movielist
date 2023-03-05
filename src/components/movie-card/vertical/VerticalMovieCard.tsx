import { MovieCardType } from "@/types/movie";
import { FC } from "react";
import { motion } from "framer-motion";
import { IconProvider } from "@/UI";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import Link from "next/link";
import { formatReleaseDate } from "@/helpers/formatReleaseDate";
import { MovieCardProps } from "../MovieCard";

export const VerticalMovieCard: FC<MovieCardType & MovieCardProps> = ({
  movieId,
  title,
  releaseDate,
  posterPath,
  isLiked,
  rating,
  isAuth,
  isAddLoading,
  isRemoveLoading,
  handleClick,
}) => {
  return (
    <Link
      className="card glass overflow-hidden pb-3"
      href={`/movie/${movieId}`}
    >
      {isAuth && (
        <motion.div
          initial={{ x: "100%", y: 0 }}
          animate={{
            x: isLiked ? 0 : "100%",
            y: isLiked ? "30%" : 0,
          }}
          className="absolute flex h-full w-full flex-col"
        >
          <button
            className={`${
              isLiked
                ? "place-self-center"
                : "group btn-circle btn -ml-16 mt-4 border-none bg-opacity-50"
            } ${(isRemoveLoading || isAddLoading) && "loading btn-circle btn"}`}
            onClick={(e) => handleClick(e)}
          >
            {!isRemoveLoading && !isAddLoading ? (
              <IconProvider
                className={`${
                  isLiked
                    ? "fill-red-600  hover:fill-white"
                    : "fill-white group-hover:fill-red-600"
                } transition duration-200 ease-in-out`}
                size={`${isLiked ? "3.75rem" : "1.75rem"}`}
              >
                <AiFillHeart />
              </IconProvider>
            ) : null}
          </button>
        </motion.div>
      )}
      <figure className="w-full p-2.5">
        <img
          src={`https://image.tmdb.org/t/p/w300${posterPath}`}
          alt={title}
          className={`rounded-box ${isLiked && "z-[-1] brightness-50"}`}
        />
      </figure>
      <div className="card-body flex h-24 flex-col px-4 py-2">
        <p className="card-title text-base 2xl:text-sm">{title}</p>
        <p className="text-sm">{formatReleaseDate(releaseDate)}</p>
      </div>
      <div className="absolute bottom-0 right-0 my-3 mx-0 flex items-center gap-1 px-3 text-sm font-bold">
        <IconProvider className="fill-yellow-400" size="1.25rem">
          <AiFillStar />
        </IconProvider>
        {rating}
      </div>
    </Link>
  );
};
