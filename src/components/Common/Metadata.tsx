import Head from "next/head";
import React from "react";

interface Props {
  title: string;
  description: string;
  image?: string;
  url: string;
  robot?: "noindex" | "nofollow";
}

const Metadata = ({ title, description, image, url, robot }: Props) => {
  return (
    <Head>
      <title>{`${title} | ریموتجو`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | ریموتجو`} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={
          `${process.env.NEXT_PUBLIC_IMAGES_URI}/${image}` ?? "/images/logo.png"
        }
      />
      <meta property="og:url" content={`https://remotejoo.ir/${url}`} />

      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:site" content="@yourhandle" /> */}
      <meta name="twitter:title" content={`${title} | ریموتجو`} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={
          `${process.env.NEXT_PUBLIC_IMAGES_URI}/${image}` ?? "/images/logo.png"
        }
      />

      <meta name="robots" content={robot ?? "all"} />
      <link rel="canonical" href={`https://remotejoo.ir/${url}`} />
    </Head>
  );
};

export default Metadata;
