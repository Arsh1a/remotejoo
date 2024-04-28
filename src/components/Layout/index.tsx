import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getData } from "@/utils/api";
import { UserType } from "@/types";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="font-sans min-h-screen relative flex flex-col">
      <Navbar />
      <div className="relative z-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
