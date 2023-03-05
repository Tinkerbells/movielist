import { PopularMoviesCarousel } from "@/modules/popular-movies-carousel";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <PopularMoviesCarousel />
    </div>
  );
};

export default Home;
