import PageJobsWrapper from "@/components/PageJobs/PageJobsWrapper";
import { InternalJobType, JobType } from "@/types";
import { SSRFetcher } from "@/utils/api";
import { GetServerSideProps } from "next";

//Same as index, Made this for having user friendly url
export default function JobPage({ data }: { data: JobType & InternalJobType }) {
  return (
    <>
      <PageJobsWrapper data={data} />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await SSRFetcher(`/jobs/${params!.slug}`);

  if (!response) {
    return { notFound: true };
  }

  return {
    props: { data: response },
  };
};
