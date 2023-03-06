import { MovieCardType } from "@/types/movie";
import { FC } from "react";
import { motion } from "framer-motion";
import { IconProvider, TMDBImageLoader } from "@/UI";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import Link from "next/link";
import { formatReleaseDate } from "@/helpers/formatReleaseDate";
import { MovieCardProps } from "../MovieCard";
import Image from "next/image";

export const HorizontalMovieCard: FC<MovieCardType & MovieCardProps> = ({
  movieId,
  title,
  releaseDate,
  overview,
  posterPath,
  isLiked,
  rating,
  isAuth,
  isAddLoading,
  isRemoveLoading,
  handleClick,
}) => {
  return (
    <motion.div
      className="card card-side h-52 w-5/6 bg-primary-content shadow-xl"
      layout
    >
      <div className="absolute sm:right-0 sm:m-4">
        {isAuth ? (
          <button
            className={`group btn-circle btn border-none bg-opacity-50 ${
              (isAddLoading || isRemoveLoading) && "loading"
            }`}
            onClick={(e) => handleClick(e)}
          >
            {!isAddLoading && !isRemoveLoading ? (
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
        <Link href={`/movie/${movieId}`}>
          <figure className="h-full w-36">
            <Image
              src={posterPath}
              alt={title}
              width={300}
              height={300}
              loader={TMDBImageLoader}
              className="h-full rounded-l-2xl"
            />
          </figure>
        </Link>
      </div>
      <div className="card-body py-5">
        <h2 className="card-title text-sm lg:text-xl">
          {title}
          <span className="flex items-center gap-1">
            <IconProvider className="fill-yellow-400" size="1.25rem">
              <AiFillStar />
            </IconProvider>
            {rating}
          </span>
        </h2>
        <p className="text-xs text-info-content lg:text-base">
          {formatReleaseDate(releaseDate)}
        </p>
        <p className="invisible text-xs sm:visible lg:text-base">{overview}</p>
      </div>
    </motion.div>
  );
};
