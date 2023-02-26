import IconProvider from "@/UI/IconProvider";
// import Image from "next/image";
import { FC, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { api } from "@/utils/api";

interface MovieCardProps {
  posterPath: string;
  title: string;
  movieId: number;
  isFavorite?: boolean;
}

const MovieCard: FC<MovieCardProps> = ({
  posterPath,
  title,
  movieId,
  isFavorite,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(isFavorite || false);

  const addFavorite = api.movie.addFavorite.useMutation();
  const deleteFavorite = api.movie.deleteFavorite.useMutation();

  const handleAddFavorite = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.detail == 2) {
      setIsLiked(true);
      void addFavorite.mutate({
        posterPath: posterPath,
        title: title,
        movieId: movieId,
      });
    }
  };

  const handleRemoveFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsLiked(false);
    void deleteFavorite.mutate({
      movieId: movieId,
    });
  };

  return (
    <div className="group card glass relative p-3" onClick={handleAddFavorite}>
      <button onClick={handleRemoveFavorite}>
        {isLiked && (
          <motion.div
            animate={{ scale: 1, y: 100 }}
            initial={{ scale: 0, y: 80 }}
          >
            <IconProvider
              className="absolute left-0 flex w-full fill-red-600 transition duration-200 ease-in-out hover:fill-white"
              size="2.75rem"
            >
              <AiFillHeart />
            </IconProvider>
          </motion.div>
        )}
      </button>
      {/* TODO replace with nextjs Image tag  */}
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className={`rounded-box h-full w-full ${
            isLiked && "z-[-1] brightness-50"
          }`}
        />
      </figure>
      <div className="card-body h-16 px-4 py-2">
        <p className="card-title text-sm">{title}</p>
      </div>
    </div>
  );
};

export default MovieCard;
