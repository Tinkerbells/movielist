import { formatReleaseDate } from "@/helpers/formatReleaseDate";
import { FC } from "react";
import { MovieListItemType } from "../movie-list/MovieList";

const MovieListItem: FC<MovieListItemType> = ({
  movieId,
  title,
  releaseDate,
  overview,
  posterPath,
}) => {
  return (
    <div className="card card-side h-40 w-5/6 bg-base-100 shadow-xl">
      <div>
        <figure className="h-full w-28">
          <img
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt="Movie"
            className="h-full rounded-l-2xl"
          />
        </figure>
      </div>
      <div className="card-body py-5">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-info-content">
          {formatReleaseDate(releaseDate)}
        </p>
        <p className="text-sm">{overview}</p>
      </div>
    </div>
  );
};
export default MovieListItem;
