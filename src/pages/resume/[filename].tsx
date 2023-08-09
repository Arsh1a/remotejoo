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

  const pdfUrl =
    "http://localhost:5555/api/v1/resumes/view/" + router.query.filename;

  return (
    <>
      {router.query.filename && (
        <iframe
          src={pdfUrl}
          width="100%"
          style={{ border: "none", height: "100vh" }}
        >
          رزومه یافت نشد.
        </iframe>
      )}
    </>
  );
}
