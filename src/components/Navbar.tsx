import { useSession, signOut } from "next-auth/react";
import NavbarSearch from "./NavbarSearch";

const Navbar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar absolute top-0 left-0 bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <NavbarSearch />
      </div>
      <div className="flex-2 navbar-end gap-2">
        <div className="dropdown-end dropdown">
          {sessionData ? (
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <img src={sessionData.user.image!!} />
              </div>
            </label>
          ) : null}
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
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
    </div>
  );
};

export default Navbar;
