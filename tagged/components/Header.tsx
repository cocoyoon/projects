import React from "react";
import localFont from "next/font/local";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const custom_font = localFont({ src: "../fonts/utah-condensed-bold.ttf" });

function Header() {
  return (
    <header>
      <div className="grid grid-cols-3 items-center py-2 border-b-2">
        <div className="flex items-center space-x-4">
          <Link href="/" prefetch={false} className="font-bold px-2">
            {" "}
            SEGMENT{" "}
          </Link>
        </div>
        <Search />
      </div>
    </header>
  );
}

function Search() {
  return (
    <div className="flex bg-gray-300 rounded-md">
      <form className="flex bg-opacity-50 items-center px-2">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none p-2 bg-gray-300 "
        />
      </form>
    </div>
  );
}

export default Header;
