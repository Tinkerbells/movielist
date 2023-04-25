import { SearchInput } from "@/UI";
import { api } from "@/utils/api";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";

const Navbar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar fixed top-0 left-0 z-40 bg-primary-content">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <NavbarSearch />
      </div>
      {sessionData ? (
        <div className="flex-2 navbar-end gap-2">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <img src={sessionData.user.image!!} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-primary-content p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={() => void signOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end">
          <button className="btn-primary btn h-8" onClick={() => void signIn()}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

const NavbarSearch = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSumbit = (event: SyntheticEvent) => {
    event.preventDefault();
    router.push({ pathname: "/search-movie", query: { query: query } });
  };

  return (
    <SearchInput
      value={query}
      onChange={handleChange}
      onSumbit={handleSumbit}
    />
  );
};

export default Navbar;
