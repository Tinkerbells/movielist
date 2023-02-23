import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import SignInButton from "@/components/SignInButton";
import { api } from "@/utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const popularMovies = api.tmdb.popularMovies.useQuery();
  console.log(popularMovies.data.results);
  return (
    <div className="absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center">
      {!sessionData ? <SignInButton /> : null}
    </div>
  );
};

export default Home;
