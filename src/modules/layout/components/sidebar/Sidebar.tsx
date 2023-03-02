import { AiFillHeart, AiFillHome } from "react-icons/ai";
import { MdSubscriptions, MdMenu } from "react-icons/md";
import { useLayoutStore } from "@/store/layoutStore";
import { IconProvider } from "@/UI";
import { FC } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useLayoutStore((state) => ({
    isCollapsed: state.isSidebarCollapsed,
    setIsCollapsed: state.setIsSidebarCollapsed,
  }));
  const router = useRouter();

  return (
    <>
      <button
        className="btn-ghost btn-circle btn fixed left-0 top-0 z-50 m-2.5"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <IconProvider size="1.5rem">
          <MdMenu />
        </IconProvider>
      </button>
      {isCollapsed ? (
        <div className="fixed left-0 top-0 z-40 flex h-full w-60 justify-center bg-primary-content">
          <ul className="menu rounded-box mt-16 w-56 gap-2 bg-primary-content p-2">
            <li>
              <Link
                href="/"
                className={`${router.pathname == "/" && "active"}`}
              >
                <IconProvider size="1.5rem">
                  <AiFillHome />
                </IconProvider>
                Home
              </Link>
            </li>
            <li>
              <NavButton
                href="/subscriptions"
                title="Subscriptions"
                isActive={router.pathname === "/subscriptions"}
              >
                <MdSubscriptions />
              </NavButton>
            </li>
            <li>
              <NavButton
                href="/liked-movies"
                title="Liked movies"
                isActive={router.pathname === "/liked-movies"}
              >
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
  isActive: boolean;
}> = ({ children, href, title, isActive }) => {
  const { data: sessionData } = useSession();
  return (
    <>
      {sessionData ? (
        <Link href={href} className={`${isActive && "active"}`}>
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
