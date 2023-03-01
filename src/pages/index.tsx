import { PopularMoviesSlider } from "@/modules/popular-movies-slider";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <PopularMoviesSlider />
      {/* {!sessionData ? <SignInButton /> : null} */}
    </div>
  );
};

export default Home;
