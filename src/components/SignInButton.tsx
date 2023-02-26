import { signIn } from "next-auth/react";
import React from "react";

const SignInButton = () => {
  return (
    <button
      className="btn-accent btn-wide btn-xs btn mt-20 place-self-center sm:btn-sm md:btn-md lg:btn-lg"
      onClick={() => void signIn()}
    >
      Sign In
    </button>
  );
};

export default SignInButton;
