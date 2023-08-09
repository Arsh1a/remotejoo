import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    const handleRouteChangeError = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  return loading;
};
