import { useLayoutStore } from "@/store/layoutStore";
import { signIn } from "next-auth/react";
import React from "react";

const SignInButton = () => {
  const isSidebarCollapsed = useLayoutStore(
    (state) => state.isSidebarCollapsed
  );

  return (
    <button
      className={`btn-accent btn-wide btn-xs btn mt-20 place-self-center sm:btn-sm md:btn-md lg:btn-lg ${
        isSidebarCollapsed && "ml-60"
      }`}
      onClick={() => void signIn()}
    >
      Sign In
    </button>
  );
};

export default SignInButton;
