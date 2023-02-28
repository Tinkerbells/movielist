import { SearchInput } from "@/UI";
import { useSession, signOut, signIn } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";

const Navbar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar absolute top-0 left-0 z-40 bg-base-100">
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
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
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
  const [search, setSearch] = useState<string>("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  console.log(search);
  return <SearchInput value={search} onChange={handleChange} />;
};

export default Navbar;
