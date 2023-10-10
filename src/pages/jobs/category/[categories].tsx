import { FilterType, JobFetchType } from "@/types";
import { SSRFetcher } from "@/utils/api";
import { GetServerSideProps } from "next";
import JobsSearchWrapper from "@/components/PageJobsSearch/JobsSearchWrapper";
import Metadata from "@/components/Common/Metadata";

export default function CategorySearchPage({
  data,
  searchObject,
}: {
  data: JobFetchType;
  searchObject: FilterType;
}) {
  return (
    <>
      <JobsSearchWrapper data={data} searchObject={searchObject} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let searchString = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");
  const searchObject = Object.keys(query)
    .map((key) => {
      return {
        [key]: query[key],
      };
    })
    .reduce((acc, cur) => {
      return { ...acc, ...cur };
    }, {});

  const response = await SSRFetcher(`/jobs?&${searchString}&limit=18`);
  return {
    props: { data: response, searchObject },
  };
};
