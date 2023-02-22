import { AiFillHeart, AiFillHome } from "react-icons/ai";
import { MdSubscriptions, MdMenu } from "react-icons/md";
import { useState } from "react";
import IconProvider from "@/UI/IconProvider";

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  return (
    <>
      <button
        className="btn-ghost btn-circle btn absolute left-0 top-0 z-50 m-2.5"
        onClick={() => setIsVisible(!isVisible)}
      >
        <IconProvider size="1.5rem">
          <MdMenu />
        </IconProvider>
      </button>
      {isVisible ? (
        <div className="absolute left-0 top-0 z-40 flex h-full w-60 justify-center bg-base-100">
          <ul className="menu rounded-box mt-16 w-56 bg-base-100 p-2">
            <li>
              <a>
                <IconProvider size="1.5rem">
                  <AiFillHome />
                </IconProvider>
                Home
              </a>
            </li>
            <li>
              <a>
                <IconProvider size="1.5rem">
                  <MdSubscriptions />
                </IconProvider>
                Subscriptions
              </a>
            </li>
            <li>
              <a>
                <IconProvider size="1.5rem">
                  <AiFillHeart />
                </IconProvider>
                Likes
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
