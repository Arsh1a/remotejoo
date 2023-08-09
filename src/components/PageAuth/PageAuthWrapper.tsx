import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "../Common/Container";
import Link from "next/link";
import Logo from "../Common/Logo";
import useAuthStore from "@/context/useAuthStore";
import useStore from "@/hooks/useStore";
import useAuthRedirect from "@/hooks/useAuthRedirect";

interface Props {
  children: React.ReactNode;
}

const PageAuthWrapper = ({ children }: Props) => {
  useAuthRedirect(true);

  return (
    <div className="relative">
      <Container
        className={
          "flex flex-col justify-center items-center my-auto z-[2] h-screen"
        }
      >
        <StageChanger />
        <div className="!w-full sm:!w-[350px] bg-white p-6 rounded-primary">
          <div className="flex justify-center">
            <Link href="/" className="hover:opacity-70 transition">
              <Logo className="!text-black" />
            </Link>
          </div>
          {children}
        </div>
      </Container>
    </div>
  );
};

export default PageAuthWrapper;

const StageChanger = ({}: {}) => {
  const router = useRouter();
  return (
    <div className="text-white flex gap-10 text-lg relative font-semibold">
      <Link
        href="/auth/signup"
        className={`relative flex-1 flex items-center justify-center transition cursor-pointer text-black${
          router.pathname === "/auth/signup" ? " text-primary" : ""
        }`}
      >
        عضویت
        {router.pathname === "/auth/signup" && (
          <div className="absolute w-full h-[2px] bg-main_no_green bottom-0"></div>
        )}
      </Link>
      <Link
        href="/auth/login"
        className={`relative flex-1 flex items-center justify-center cursor-pointertransition text-black${
          router.pathname === "/auth/login" ? " text-primary" : ""
        }`}
      >
        ورود
        {router.pathname === "/auth/login" && (
          <div className="absolute w-full h-[2px] bg-main_no_green bottom-0"></div>
        )}
      </Link>
    </div>
  );
};
