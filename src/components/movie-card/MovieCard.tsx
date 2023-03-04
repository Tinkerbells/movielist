import { MovieCardType } from "@/types/movie";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { IconProvider } from "@/UI";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { formatReleaseDate } from "@/helpers/formatReleaseDate";
import Link from "next/link";
import { toast } from "react-toastify";

const CardVariants = ["horizontal", "vertical"] as const;

type CardVariantType = (typeof CardVariants)[number];

interface MovieCardVariant {
  variant: CardVariantType;
}

export const MovieCard: FC<MovieCardType & MovieCardVariant> = ({
  movieId,
  title,
  releaseDate,
  overview,
  posterPath,
  isLiked,
  rating,
  variant,
}) => {
  const { data: sessionData } = useSession();

  const { refetch } = api.movie.getLiked.useQuery();

  const { mutate: setLiked, isLoading: isSetLoading } =
    api.movie.setLiked.useMutation({
      onSuccess: async () => {
        await refetch();
        toast(`Movie has been added to liked`, {
          autoClose: 500,
          pauseOnHover: false,
          theme: "dark",
          icon: <AiFillHeart />,
        });
      },
    });
  const { mutate: deleteLiked, isLoading: isDeleteLoading } =
    api.movie.deleteLiked.useMutation({
      onSuccess: async () => {
        await refetch();
        toast(`Movie has been removed from liked`, {
          autoClose: 500,
          pauseOnHover: false,
          theme: "dark",
          icon: <AiFillHeart />,
        });
      },
    });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLiked) {
      void deleteLiked({
        movieId: movieId,
      });
    } else {
      void setLiked({
        posterPath: posterPath,
        title: title,
        movieId: movieId,
        releaseDate: releaseDate,
        overview: overview,
        rating: rating,
      });
    }
  };
  if (variant === "horizontal") {
    return (
      <motion.div
        className="card card-side h-52 w-5/6 bg-primary-content shadow-xl"
        layout
      >
        <div className="absolute sm:right-0 sm:m-4">
          {sessionData ? (
            <button
              className={`group btn-circle btn border-none bg-opacity-50 ${
                (isSetLoading || isDeleteLoading) && "loading"
              }`}
              onClick={(e) => handleClick(e)}
            >
              {!isSetLoading && !isDeleteLoading ? (
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
              <img
                src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
                alt="Movie"
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
          <p className="invisible text-xs sm:visible lg:text-base">
            {overview}
          </p>
        </div>
      </motion.div>
    );
  }
  return (
    <Link
      className="card glass overflow-hidden pb-3"
      href={`/movie/${movieId}`}
    >
      {/* TODO replace with nextjs Image tag  */}
      {sessionData && (
        <div className="absolute h-full w-full">
          <motion.div
            initial={{ x: "100%", y: 0 }}
            animate={{
              x: isLiked ? 0 : "100%",
              y: isLiked ? "30%" : 0,
            }}
            className="flex h-full w-full flex-col"
          >
            <button
              className={`${
                isLiked
                  ? "place-self-center"
                  : "group btn-circle btn -ml-16 mt-4 border-none bg-opacity-50"
              } ${
                (isDeleteLoading || isSetLoading) && "loading btn-circle btn"
              }`}
              onClick={(e) => handleClick(e)}
            >
              <IconProvider
                className={`${
                  isLiked
                    ? "fill-red-600  hover:fill-white"
                    : "fill-white group-hover:fill-red-600"
                } transition duration-200 ease-in-out ${
                  (isDeleteLoading || isSetLoading) && "hidden"
                }`}
                size={`${isLiked ? "3.75rem" : "1.75rem"}`}
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
            isLiked && "z-[-1] brightness-50"
          }`}
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
