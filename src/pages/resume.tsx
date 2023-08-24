import LoadingAnimation from "@/components/Common/LoadingAnimation";
import CTA from "@/components/PageHome/CTA";
import FAQ from "@/components/PageHome/FAQ";
import HomeHero from "@/components/PageHome/HomeHero";
import LatestJobs from "@/components/PageHome/LatestJobs";
import { JobFetchType } from "@/types";
import { SSRFetcher } from "@/utils/api";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function ResumePage() {
  const router = useRouter();

  if (!router.query.file_name)
    return (
      <div className="w-screen h-screen">
        <LoadingAnimation />
      </div>
    );

  return (
    <div className="w-screen h-screen">
      <iframe
        className="w-full h-full"
        src={`https://c487261.parspack.net/c487261/${router.query.file_name}`}
      ></iframe>
    </div>
  );
}
