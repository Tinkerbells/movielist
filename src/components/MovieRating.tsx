import { FC } from "react";

interface MovieRatingProps {
  vote: number;
}
const MovieRating: FC<MovieRatingProps> = ({ vote }) => {
  return <div>{vote}</div>;
};

export default MovieRating;
