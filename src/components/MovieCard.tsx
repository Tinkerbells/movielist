import IconProvider from "@/UI/IconProvider";
// import Image from "next/image";
import { FC, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";

interface MovieCardProps {
  image: string;
  name: string;
}
const MovieCard: FC<MovieCardProps> = ({ image, name }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.detail == 2) {
      setIsLiked(true);
    }
  };

  return (
    <div className="group card glass relative p-3" onClick={handleDoubleClick}>
      {isLiked && (
        <button onClick={() => setIsLiked(false)}>
          <motion.div
            animate={{ scale: 1, y: 100 }}
            initial={{ scale: 0, y: 80 }}
          >
            <IconProvider
              className="absolute left-0 flex w-full fill-red-600 transition duration-300 ease-in-out hover:fill-white"
              size="2.75rem"
            >
              <AiFillHeart />
            </IconProvider>
          </motion.div>
        </button>
      )}
      {/* TODO replace with nextjs Image tag  */}
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt={name}
          className={`rounded-box h-full w-full ${
            isLiked && "z-[-1] brightness-50"
          }`}
        />
      </figure>
      <div className="card-body h-16 px-4 py-2">
        <p className="card-title text-sm">{name}</p>
      </div>
    </div>
  );
};

export default MovieCard;
