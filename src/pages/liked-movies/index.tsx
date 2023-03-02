import { LikedMovieList } from "@/modules/liked-movies-list";
import { NextPage } from "next";

const Favorite: NextPage = () => {
  return (
    <div className="flex flex-col">
      <LikedMovieList />
    </div>
  );
};

export default Favorite;
