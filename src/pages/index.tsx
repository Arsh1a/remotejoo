import CTA from "@/components/PageHome/CTA";
import FAQ from "@/components/PageHome/FAQ";
import HomeHero from "@/components/PageHome/HomeHero";
import LatestJobs from "@/components/PageHome/LatestJobs";
import { JobFetchType } from "@/types";
import { SSRFetcher } from "@/utils/api";
import { GetServerSideProps } from "next";

export default function HomePage({ data }: { data: JobFetchType }) {
  return (
    <>
      <HomeHero />
      <LatestJobs data={data.jobs} />
      <FAQ />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await SSRFetcher(`/jobs?limit=12`);
  return {
    props: { data: response ?? [] },
  };
};
