import React from "react";
import Container from "../Common/Container";
import Logo from "../Common/Logo";
import Link from "next/link";
import { contactInfo } from "@/constants/info.constants";
import { footerLinks } from "@/constants/links.constants";
import { BsGithub } from "react-icons/bs";

interface Props {}

const Footer = ({}: Props) => {
  return (
    <footer className="bg-main text-white relative mt-auto">
      <Container className="flex py-8 md:py-16 gap-y-10 gap-x-24 flex-wrap">
        <div className="flex flex-col items-start gap-2 sm:w-[300px]">
          <Logo className="text-white" />
          <p>
            با ریموتجو، فرصت‌های شغلی دورکاری در ایران را در دستان خود داشته
            باش.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">دسترسی سریع</span>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((l) => (
              <li key={l.url}>
                <Link className="hover:opacity-70 transition" href={l.url}>
                  {l.label}
                </Link>
              </li>
            ))}
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
        <a
          href="https://github.com/arsh1a/remotejoo"
          target="_blank"
          rel="noreferrer"
          className="transition hover:opacity-70 self-start"
        >
          <BsGithub className="text-2xl" />
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
