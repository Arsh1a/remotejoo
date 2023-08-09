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
  const [userData, setUserData] = useState<UserType | null | false>(false);

  const router = useRouter();
  const contextReset = useAuthStore((state) => state.contextReset);
  const contextLogin = useAuthStore((state) => state.contextLogin);

  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getData<UserType>("/auth/me"),
    onSuccess: (res) => {
      contextLogin();
      setUserData(res.data);
    },
    onError: () => {
      contextReset();
      setUserData(null);
    },
  });

  //If website is down show these stuff
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "1") {
    return (
      <div className={`font-sans flex flex-col min-h-screen`}>{children}</div>
    );
  }

  if (router.asPath.includes("/resume")) {
    return <>{children}</>;
  }

  return (
    <div className={`font-sans min-h-screen`}>
      {!router.pathname.includes("/auth") && <Navbar data={userData} />}
      {router.pathname.includes("/panel") ? (
        <PanelLayout>{children}</PanelLayout>
      ) : (
        <div>{children}</div>
      )}
      {!router.pathname.includes("/auth") && <Footer />}
    </div>
  );
};

export default Layout;
