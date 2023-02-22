import NavbarSearch from "@/components/NavbarSearch";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar absolute top-0 left-0 z-40 bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <NavbarSearch />
      </div>
      <div className="flex-2 navbar-end gap-2">
        {sessionData ? (
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
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
