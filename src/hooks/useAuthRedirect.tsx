import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useStore from "./useStore";
import useAuthStore from "@/context/useAuthStore";

const useAuthRedirect = (state: boolean, redirectPath: string) => {
  const router = useRouter();
  const loggedIn = useStore(useAuthStore, (state) => state.loggedIn);

  useEffect(() => {
    if (loggedIn === state) {
      router.push(redirectPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);
};

export default useAuthRedirect;
