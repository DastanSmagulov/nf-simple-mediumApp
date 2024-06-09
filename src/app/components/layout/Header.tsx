"use client";

import Link from "next/link";
import ThemeBtn from "../ThemeBtn";

interface HeaderProps {
  loggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ loggedIn }) => {
  return (
    <div className="flex justify-center gap-10 max-sm:gap-4 items-center pt-6">
      <Link href={`/articles`}>
        <h1 className="text-lg font-semibold max-sm:text-md">Medium alike</h1>
      </Link>
      {loggedIn ? (
        <Link href={"/"} onClick={() => localStorage.clear()}>
          <h1 className="text-lg font-semibold max-sm:text-md">Logout</h1>
        </Link>
      ) : null}
      <ThemeBtn />
    </div>
  );
};

export default Header;
