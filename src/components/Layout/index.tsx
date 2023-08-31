import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import useAuthStore from "@/context/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getData } from "@/utils/api";
import { UserType } from "@/types";
import PanelLayout from "./PanelLayout";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  //If website is down show these stuff
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "1") {
    return (
      <div className={`font-sans flex flex-col min-h-screen`}>{children}</div>
    );
  }

  return (
    <div className="font-sans min-h-screen relative flex flex-col">
      <Navbar />
      <div className="relative z-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
