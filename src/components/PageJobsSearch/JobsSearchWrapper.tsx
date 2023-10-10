import React, { useEffect, useState } from "react";
import Container from "../Common/Container";
import { FilterType, CategoryType, OriginType, JobFetchType } from "@/types";
import { filterObjectToQueryString } from "@/utils/api";
import { useRouter } from "next/router";
import AltJobsFilter from "./AltJobsFilter";
import JobTopFilter from "./JobTopFilter";
import JobsAppliedFiltersCategories from "./JobsAppliedFiltersCategories";
import JobsCount from "./JobsCount";
import JobsList from "./JobsList";
import Metadata from "../Common/Metadata";
import { categories } from "@/constants/ui.constants";

interface Props {
  data: JobFetchType;
  searchObject: FilterType;
}

const JobsSearchWrapper = ({ data, searchObject }: Props) => {
  //CORE OF FILTERING
  //We get filter options from url (using SSR) and put it in the state
  //If user changes any filter, we use `setFilters` to change current filters
  //When filters change, we push the user to the new URL which includes new filters
  const [filters, setFilters] = useState<FilterType>({
    page: searchObject?.page && Number(searchObject.page),
    limit: searchObject?.limit && Number(searchObject.limit),
    text: searchObject?.text && searchObject.text,
    categories:
      searchObject?.categories &&
      ((searchObject.categories as unknown as string).split(
        ","
      ) as CategoryType[]),
    origins:
      searchObject?.origins &&
      ((searchObject.origins as unknown as string).split(",") as OriginType[]),
  });

  const CategoryPageIdentifier = filters.categories?.length === 1;

  const router = useRouter();

  const handleFilterChange = (filterObj: FilterType) => {
    let filterObjCleaned: FilterType = {};

    //If pagination is not used (if filterObj doesnt contain 'page'), then send user to first page
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    //We have diffrente pages for categories for SEO reasons. So we push user to that page if there is only one category seleceted.
    if (CategoryPageIdentifier) {
      //Exclude categories from appering in queries
      const { categories, ...queries } = filters;
      router.push(
        `/jobs/category/${filters.categories![0]}?${filterObjectToQueryString(
          queries
        )}`,
        undefined,
        {
          scroll: false,
        }
      );
      return;
    }

    //If there is more than 1 categories or there is no category, we push user to the main search page.
    if (
      filters.categories?.length === 0 ||
      !filters.categories ||
      filters.categories?.length! > 1
    ) {
      router.push(`/jobs?${filterObjectToQueryString(filters)}`, undefined, {
        scroll: false,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const metadataTitle = CategoryPageIdentifier
    ? `استخدام برنامه نویس ${categories[filters.categories![0]].label} دورکاری`
    : "استخدام برنامه نویس دورکاری";

  const metaDataDesc = CategoryPageIdentifier
    ? `آگهی های شغلی استخدام برنامه نویس ${
        categories[filters.categories![0]].label
      } دورکاری - با ریموتجو، فرصت‌های شغلی دورکاری در ایران را در دستان خود داشته باش.`
    : `آگهی های شغلی استخدام برنامه نویس دورکاری - با ریموتجو، فرصت‌های شغلی دورکاری در ایران را در دستان خود داشته باش.`;

  return (
    <>
      <Metadata
        description={
          "آگهی‌های شغلی استخدام برنامه نویس  - SEO را در Quera ببینید و شغل رویایی خود را پیدا کنید."
        }
        url={"search"}
        title={`${metadataTitle}`}
      />
      <div className="relative">
        <JobTopFilter
          searchText={filters.text}
          handleFilterChange={handleFilterChange}
        />
        <Container className="flex flex-col md:flex-row gap-6 items-start relative">
          <aside className="flex flex-col gap-6 w-full md:w-[unset]">
            <AltJobsFilter
              handleFilterChange={handleFilterChange}
              filters={filters}
            />
          </aside>
          <div className="flex flex-col gap-4 w-full">
            <JobsCount data={data} />
            <JobsAppliedFiltersCategories
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
};

export default JobsSearchWrapper;
