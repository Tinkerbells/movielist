import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
import SignInButton from "@/components/SignInButton";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center">
      {!sessionData ? <SignInButton /> : null}
    </div>
  );
};

export default Home;
