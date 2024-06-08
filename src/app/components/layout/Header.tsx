"use client";

import Link from "next/link";
import ThemeBtn from "../ThemeBtn";

const Header = ({ loggedIn }: any) => {
  return (
    <div className="flex justify-center gap-10 items-center pt-6">
      <Link href={`/articles`}>
        <h1 className="text-lg font-semibold">Medium alike</h1>
      </Link>
      {loggedIn ? (
        <Link href={"/"} onClick={() => localStorage.clear()}>
          <h1 className="text-lg font-semibold">Logout</h1>
        </Link>
      ) : null}
      <ThemeBtn />
    </div>
  );
};

export default Header;
