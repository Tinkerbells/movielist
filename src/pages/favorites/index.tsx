import { FavoriteMoviesList } from "@/modules/favorite-movies-list";
import { NextPage } from "next";

const Favorite: NextPage = () => {
  return (
    <div className="flex flex-col">
      <FavoriteMoviesList />
    </div>
  );
};

export default Favorite;
