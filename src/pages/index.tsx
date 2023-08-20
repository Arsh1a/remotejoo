import Metadata from "@/components/Common/Metadata";
import CTA from "@/components/PageHome/CTA";
import FAQ from "@/components/PageHome/FAQ";
import HomeHero from "@/components/PageHome/HomeHero";
import LatestJobs from "@/components/PageHome/LatestJobs";
import { JobFetchType } from "@/types";
import { SSRFetcher } from "@/utils/api";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";

export default function HomePage({ data }: { data: JobFetchType }) {
  return (
    <>
      <Metadata
        title="استخدام | آگهی استخدامی دورکاری "
        description={
          "با ریموتجو، فرصت‌های شغلی دورکاری در ایران را در دستان خود داشته باش و به راحتی کار ریموت پیدا کن."
        }
        url={""}
      />
      <HomeHero />
      <LatestJobs data={data.jobs} />
      <FAQ />
    </>
  );
}
export const getStaticProps: GetStaticProps = async (context) => {
  const response = await SSRFetcher(`/jobs?limit=12`);
  return {
    props: { data: response ?? [] },
  };
};
