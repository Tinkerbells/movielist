import Image from "next/image";
import { FC } from "react";

interface MovieCardProps {
  image: string;
  name: string;
}
const MovieCard: FC<MovieCardProps> = ({ image, name }) => {
  return (
    <Image
      src={`https://image.tmdb.org/t/p/w500${image}`}
      alt={name}
      width={300}
      height={400}
      className="rounded-lg"
    />
  );
};

export default MovieCard;
