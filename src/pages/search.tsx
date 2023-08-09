import Container from "@/components/Common/Container";
import JobsFilter from "@/components/PageSearch/JobsFilter";
import JobTopFilter from "@/components/PageSearch/JobTopFilter";
import JobsAppliedFiltersTags from "@/components/PageSearch/JobsAppliedFiltersTags";
import JobsCount from "@/components/PageSearch/JobsCount";
import JobsList from "@/components/PageSearch/JobsList";
import { FilterType, JobFetchType, JobType, TagType } from "@/types";
import { SSRFetcher, filterObjectToQueryString } from "@/utils/api";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import EmployerCTA from "@/components/PageSearch/EmployerCTA";

export default function SearchPage({
  data,
  searchObject,
}: {
  data: JobFetchType;
  searchObject: FilterType;
}) {
  //CORE OF FILTERING
  //We get filter options from url (using SSR) and put it in the state
  //If user changes any filter, we use `setFilters` to change current filters
  //When filters change, we push the user to the new URL which includes new filters
  const [filters, setFilters] = useState<FilterType>({
    page: searchObject?.page && Number(searchObject.page),
    limit: searchObject?.limit && Number(searchObject.limit),
    text: searchObject?.text && searchObject.text,
    tags:
      searchObject?.tags &&
      ((searchObject.tags as string).split(",") as TagType[]),
  });

  const router = useRouter();

  const handleFilterChange = (filterObj: FilterType) => {
    let filterObjCleaned: FilterType = {};

    //If pagination is not used (filterObj doesnt contain 'page'), then send user to first page
    if (filterObj.page) {
      filterObjCleaned = filterObj;
    } else {
      filterObjCleaned = { ...filterObj, page: 1 };
    }

    setFilters((prevState) => {
      return { ...prevState, ...filterObjCleaned };
    });
  };

  useEffect(() => {
    if (Object.values(filters).join("")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      router.push(`/search?${filterObjectToQueryString(filters)}`, undefined, {
        scroll: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <>
      <div className="relative">
        <JobTopFilter
          searchText={filters.text}
          handleFilterChange={handleFilterChange}
        />
        <Container className="flex flex-col md:flex-row gap-6 items-start relative">
          <aside className="md:sticky top-6 flex flex-col gap-6 w-full md:w-[unset]">
            <EmployerCTA />
            <JobsFilter
              handleFilterChange={handleFilterChange}
              filters={filters}
            />
          </aside>
          <div className="flex flex-col gap-4 w-full">
            <JobsCount data={data} />
            <JobsAppliedFiltersTags
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
            <JobsList
              handleFilterChange={handleFilterChange}
              currentPage={filters.page!}
              data={data}
            />
          </div>
        </Container>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchString = Object.keys(context.query)
    .map((key) => `${key}=${context.query[key]}`)
    .join("&");
  const searchObject = Object.keys(context.query)
    .map((key) => {
      return {
        [key]: context.query[key],
      };
    })
    .reduce((acc, cur) => {
      return { ...acc, ...cur };
    }, {});

  const response = await SSRFetcher(`/jobs?${searchString}&limit=18`);
  return {
    props: { data: response, searchObject },
  };
};
