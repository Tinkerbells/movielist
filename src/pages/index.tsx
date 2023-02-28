import { PopularMoviesSlider } from "@/modules/popular-movies-slider";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="absolute top-0 left-0 z-0 flex h-full w-full flex-col">
      <PopularMoviesSlider />
      {/* {!sessionData ? <SignInButton /> : null} */}
    </div>
  );
};

export default Home;
