import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import Script from "next/script";

const yekan = localFont({
  src: [
    {
      path: "../../public/fonts/YekanBakh-Light.woff",
      weight: "400",
    },
    {
      path: "../../public/fonts/YekanBakh-Regular.woff",
      weight: "500",
    },
    {
      path: "../../public/fonts/YekanBakh-SemiBold.woff",
      weight: "600",
    },
    {
      path: "../../public/fonts/YekanBakh-Bold.woff",
      weight: "700",
    },
  ],
  variable: "--font-yekan",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const Toaster = dynamic(
  () => import("react-hot-toast").then((c) => c.Toaster),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-SW8G8YRSC2"
      ></Script>
      <Script id="gtag">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-SW8G8YRSC2');
        `}
      </Script>
      <div className={`${yekan.variable}`}>
        <Layout>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 7000,
              style: {
                fontSize: "1.2rem",
                padding: "16px",
              },
            }}
          />
          <Component {...pageProps} />
        </Layout>
      </div>
    </QueryClientProvider>
  );
}
