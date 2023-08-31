import { navbarLinks } from "@/constants/links.constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import Logo from "../Common/Logo";
import Button from "../Common/Button";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { UserType } from "@/types";
import AuthDropDown from "./AuthDropDown";

interface Props {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
}

const NavbarMobileMenu = ({ setIsMenuOpen, isMenuOpen }: Props) => {
  const ref = useOnClickOutside<HTMLDivElement>(() => setIsMenuOpen(false));

  useEffect(() => {
    if (typeof window != "undefined" && window.document && isMenuOpen) {
      document.body.style.overflow = "hidden";
    }
    if (typeof window != "undefined" && window.document && !isMenuOpen) {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <div
      className={`absolute min-h-screen w-full overflow-hidden bg-slate-600 bg-opacity-90 transition-all z-40${
        isMenuOpen ? "" : " invisible bg-opacity-0"
      }`}
    >
      <nav
        ref={ref}
        className={`absolute min-h-screen top-0 bg-white min-w-[15rem] duration-500 transition-all${
          isMenuOpen ? " right-0" : " -right-64"
        }`}
      >
        <Link
          href="/"
          className="bg-basic flex p-4 shadow-xl"
          onClick={() => setIsMenuOpen(false)}
        >
          <Logo className="self-start" />
        </Link>
        <ul className="flex flex-col text-lg overflow-y-auto">
          {navbarLinks.map((l) => (
            <li key={l.url} className="text-black border-b p-4">
              <Link
                className="hover:opacity-70 transition"
                onClick={() => setIsMenuOpen(false)}
                href={l.url}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavbarMobileMenu;
