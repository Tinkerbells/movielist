import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import SignInButton from "@/components/SignInButton";
import { PopularMoviesSlider } from "@/modules/popular-movies";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="absolute top-0 left-0 z-0 flex h-full w-full flex-col">
      <PopularMoviesSlider />
      {!sessionData ? <SignInButton /> : null}
    </div>
  );
};

export default Home;
