import { FavoriteMoviesList } from "@/modules/favorite-movies-list";
import { NextPage } from "next";

const Favorite: NextPage = () => {
  return (
    <div className="absolute top-0 left-0 z-0 flex h-full w-full flex-col pl-60">
      <FavoriteMoviesList />
    </div>
  );
};

export default Favorite;
