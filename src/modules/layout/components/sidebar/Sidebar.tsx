import { AiFillHeart, AiFillHome } from "react-icons/ai";
import { MdSubscriptions, MdMenu } from "react-icons/md";
import { useLayoutStore } from "@/store/layoutStore";
import { IconProvider } from "@/UI";
import { FC } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useLayoutStore((state) => ({
    isCollapsed: state.isSidebarCollapsed,
    setIsCollapsed: state.setIsSidebarCollapsed,
  }));
  return (
    <>
      <button
        className="btn-ghost btn-circle btn absolute left-0 top-0 z-50 m-2.5"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <IconProvider size="1.5rem">
          <MdMenu />
        </IconProvider>
      </button>
      {isCollapsed ? (
        <div className="absolute left-0 top-0 z-40 flex h-full w-60 justify-center bg-base-100">
          <ul className="menu rounded-box mt-16 w-56 gap-2 bg-base-100 p-2">
            <li>
              <Link href="/">
                <IconProvider size="1.5rem">
                  <AiFillHome />
                </IconProvider>
                Home
              </Link>
            </li>
            <li>
              <NavButton href="/subscriptions" title="Subscriptions">
                <MdSubscriptions />
              </NavButton>
            </li>
            <li>
              <NavButton href="/favorites " title="Favorites">
                <AiFillHeart />
              </NavButton>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

const NavButton: FC<{
  children: React.ReactNode;
  title: string;
  href: string;
}> = ({ children, href, title }) => {
  const { data: sessionData } = useSession();
  return (
    <>
      {sessionData ? (
        <Link href={href}>
          <IconProvider size="1.5rem">{children}</IconProvider>
          {title}
        </Link>
      ) : (
        <label htmlFor="login-modal">
          <IconProvider size="1.5rem">{children}</IconProvider>
          {title}
        </label>
      )}
    </>
  );
};

export default Sidebar;
