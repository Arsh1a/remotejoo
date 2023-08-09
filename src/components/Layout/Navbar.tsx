import React from "react";
import Container from "../Common/Container";
import Button from "../Common/Button";
import Link from "next/link";
import { MdPerson, MdSearch } from "react-icons/md";
import { UserType } from "@/types";
import Logo from "../Common/Logo";
import { navbarLinks } from "@/constants/links.constants";
import { useRouter } from "next/router";
import AuthDropDown from "./AuthDropDown";

interface Props {
  data: UserType | null | false;
}

const Navbar = ({ data }: Props) => {
  const router = useRouter();

  return (
    <header
      className={`bg-main text-white${
        router.pathname === "/" ? " -mb-24" : ""
      }`}
    >
      <Container className="flex">
        <nav className="flex gap-4 flex-col sm:flex-row justify-between items-center bg-base-100 z-10 bg-transparent w-full">
          <div className="flex gap-10 items-center font-semibold">
            <Link href="/" className="hover:opacity-70 transition">
              <Logo />
            </Link>
            {navbarLinks.map((l) => (
              <Link
                className="hover:opacity-70 transition"
                key={l.url}
                href={l.url}
              >
                {l.label}
              </Link>
            ))}
          </div>
          {data !== false ? (
            data ? (
              <AuthDropDown data={data} />
            ) : (
              <div className="flex gap-4 sm:mr-auto items-center justify-center font-semibold">
                <Link
                  className="text-lg hover:opacity-70 transition"
                  href="/auth/login"
                >
                  ورود
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex justify-center items-center"
                >
                  <Button className="!text-lg" variant="white">
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
