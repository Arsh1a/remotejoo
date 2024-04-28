import React, { useState } from "react";
import Container from "../Common/Container";
import Link from "next/link";
import { MdMenu, MdPerson, MdSearch } from "react-icons/md";
import Logo from "../Common/Logo";
import { navbarLinks } from "@/constants/links.constants";
import { useRouter } from "next/router";
import NavbarMobileMenu from "./NavbarMobileMenu";
import { BsGithub } from "react-icons/bs";

interface Props {}

const Navbar = ({}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header
      className={`bg-main text-white${
        router.pathname === "/" ? " -mb-24" : ""
      }`}
    >
      <NavbarMobileMenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
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
          <a
            href="https://github.com/arsh1a/remotejoo"
            target="_blank"
            rel="noreferrer"
            className="transition hover:opacity-70"
          >
            <BsGithub className="text-2xl" />
          </a>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
