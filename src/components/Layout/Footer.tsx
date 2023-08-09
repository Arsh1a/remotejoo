import React from "react";
import Container from "../Common/Container";
import Logo from "../Common/Logo";
import Link from "next/link";
import { contactInfo } from "@/constants/info.constants";

interface Props {}

const Footer = ({}: Props) => {
  return (
    <footer className="bg-main text-white relative mt-auto z-[-1]">
      <Container className="flex py-8 md:py-16 gap-y-10 gap-x-24 flex-wrap">
        <Logo className="text-white" />
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">دسترسی سریع</span>
          <ul className="flex flex-col gap-2">
            <li>
              <Link className="hover:opacity-70 transition" href="/search">
                فرصت های شغلی دورکاری
              </Link>
            </li>
            <li>
              <Link className="hover:opacity-70 transition" href="/terms">
                قوانین و مقررات
              </Link>
            </li>
            <li>
              <Link className="hover:opacity-70 transition" href="/panel">
                پنل کاربری
              </Link>
            </li>
            <li>
              <Link className="hover:opacity-70 transition" href="/contact">
                تماس با ما
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">ارتباط با ما</span>
          <a
            className="hover:opacity-70 transition"
            href={`mailto:${contactInfo.email}`}
          >
            {contactInfo.email}
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
