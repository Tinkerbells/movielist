import Image from "next/image";
import { FC } from "react";

interface MovieCardProps {
  image: string;
  name: string;
}
const MovieCard: FC<MovieCardProps> = ({ image, name }) => {
  return (
    <div className="carousel-item card glass p-2">
      {/* TODO replace with nextjs Image tag  */}
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt={name}
          className="rounded-box h-full w-full"
        />
      </figure>
      <div className="card-body h-16 px-4 py-2">
        <p className="card-title text-base">{name}</p>
      </div>
    </div>
  );
};

export default MovieCard;
