import { BurgerIcon } from "@/UI/icons/BurgerIcon";
import { HomeIcon } from "@/UI/icons/HomeIcon";
import { useState } from "react";
const Sidebar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  return (
    <>
      <button
        className="btn-ghost btn-circle btn absolute left-0 top-0 z-50 m-2.5"
        onClick={() => setIsVisible(!isVisible)}
      >
        <BurgerIcon />
      </button>
      {isVisible ? (
        <div className="absolute left-0 top-0 z-40 h-full w-60 bg-base-100">
          <ul className="menu rounded-box mt-14 w-56 bg-base-100 p-2">
            <li>
              <a>
                <HomeIcon />
                Home
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Item 1
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Item 3
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
