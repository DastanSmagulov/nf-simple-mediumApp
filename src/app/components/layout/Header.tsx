"use client";

import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-center pt-6">
      <Link href={`/articles`}>
        <h1 className="text-lg font-semibold">Medium alike</h1>
      </Link>
    </div>
  );
};

export default Header;
