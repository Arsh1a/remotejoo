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
  data: UserType | null | false;
}

const NavbarMobileMenu = ({ setIsMenuOpen, isMenuOpen, data }: Props) => {
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
          {data !== false ? (
            data ? (
              <>
                <li className="text-black border-b p-4">
                  <Link
                    className="hover:opacity-70 transition"
                    onClick={() => setIsMenuOpen(false)}
                    href="/panel/emloyee"
                  >
                    بخش کارجویان
                  </Link>
                </li>
                <li className="text-black border-b p-4">
                  <Link
                    className="hover:opacity-70 transition"
                    onClick={() => setIsMenuOpen(false)}
                    href="/panel/emloyer"
                  >
                    بخش کارفرمایان
                  </Link>
                </li>
                <li className="text-black border-b p-4">
                  <Link
                    className="hover:opacity-70 transition"
                    onClick={() => setIsMenuOpen(false)}
                    href="/panel/settings"
                  >
                    تنظیمات
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-black p-4 pb-0">
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    className="transition flex justify-center items-center"
                    href="/auth/login"
                  >
                    <Button className="text-lg w-full" variant="black">
                      ورود
                    </Button>
                  </Link>
                </li>
                <li className="text-black p-4">
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    href="/auth/signup"
                    className="flex justify-center items-center"
                  >
                    <Button className="text-lg w-full" variant="primary">
                      عضویت
                    </Button>
                  </Link>
                </li>
              </>
            )
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavbarMobileMenu;
