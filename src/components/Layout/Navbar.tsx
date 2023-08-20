import React, { useState } from "react";
import Container from "../Common/Container";
import Button from "../Common/Button";
import Link from "next/link";
import { MdMenu, MdPerson, MdSearch } from "react-icons/md";
import { UserType } from "@/types";
import Logo from "../Common/Logo";
import { navbarLinks } from "@/constants/links.constants";
import { useRouter } from "next/router";
import AuthDropDown from "./AuthDropDown";
import NavbarMobileMenu from "./NavbarMobileMenu";

interface Props {
  data: UserType | null | false;
}

const Navbar = ({ data }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header
      className={`bg-main text-white${
        router.pathname === "/" ? " -mb-24" : ""
      }`}
    >
      <NavbarMobileMenu
        data={data}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      />
      <Container className="flex relative">
        <nav className="flex gap-4 justify-between z-[11] relative items-center bg-base-100 bg-transparent w-full">
          <div className="flex gap-5 md:gap-10 items-center font-semibold flex-1">
            <div className="block md:hidden">
              <MdMenu
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                size={28}
                className={`cursor-pointer hover:opacity-70 transition`}
              />
            </div>
            <Link href="/" className="hover:opacity-70 transition">
              <Logo className="!text-2xl after:!h-3 after:!w-3" />
            </Link>
            <ul className="items-center gap-10 hidden md:flex">
              {navbarLinks.map((l) => (
                <li key={l.url}>
                  <Link className="hover:opacity-70 transition" href={l.url}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {data !== false ? (
            data ? (
              <AuthDropDown data={data} />
            ) : (
              <div className="gap-4 sm:mr-auto items-center justify-center font-semibold hidden sm:flex">
                <Link
                  className="hover:opacity-70 transition"
                  href="/auth/login"
                >
                  ورود
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex justify-center items-center"
                >
                  <Button className="" variant="white">
                    عضویت
                  </Button>
                </Link>
              </div>
            )
          ) : (
            <></>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
