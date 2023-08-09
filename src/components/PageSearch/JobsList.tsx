import React, { ButtonHTMLAttributes } from "react";
import { FilterType, JobFetchType, JobType } from "@/types";
import { toFarsiNumber } from "@/utils/utils";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import DataNotFound from "../Common/DataNotFound";
import JobCardAlternative from "../Common/JobCardAlternative";

interface Props {
  data: JobFetchType;
  currentPage: number;
  handleFilterChange: (filterObj: FilterType) => void;
}

const JobsList = ({ data, currentPage, handleFilterChange }: Props) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-4">
        {data.jobs.length > 0 ? (
          <>
            <div className="flex flex-col gap-3 lg:gap-6">
              {data.jobs.map((job, i) => (
                <JobCardAlternative {...job} key={i} />
              ))}
            </div>
          </>
        ) : (
          <DataNotFound />
        )}
      </div>
      {data.jobs.length > 0 && (
        <JobsPagination
          currentPage={currentPage}
          handleFilterChange={handleFilterChange}
          totalPages={data.totalPages}
        />
      )}
    </div>
  );
};

export default JobsList;

const JobsPagination = ({
  totalPages,
  currentPage,
  handleFilterChange,
}: {
  totalPages: number;
  currentPage: number;
  handleFilterChange: (filterObj: FilterType) => void;
}) => {
  const renderButtons = () => {
    const buttons = [];
    const currPage = currentPage ? currentPage : 1;
    for (let i = 1; i <= totalPages; i++) {
      //Pagination logic to when render what
      if (i === 1) continue;
      if (i > currPage + 1) continue;
      if (i < currPage - 1) continue;
      if (i === totalPages) continue;
      buttons.push(
        <PaginationButton
          onClick={() => handleFilterChange({ page: i })}
          active={currentPage === i}
          key={i}
        >
          {toFarsiNumber(i)}
        </PaginationButton>
      );
    }
    return (
      <>
        {currPage > 3 && <>...</>}
        {buttons}
        {totalPages - 2 > currPage && <>...</>}
      </>
    );
  };

  return (
    <div className="mt-6 rounded-primary p-2 min-w-[200px] flex gap-2 items-center text-xl justify-center bg-white">
      <PaginationButton
        onClick={() => {
          if (currentPage > 1) {
            handleFilterChange({ page: currentPage - 1 });
          }
        }}
      >
        <MdArrowForward />
      </PaginationButton>
      <PaginationButton
        onClick={() => handleFilterChange({ page: 1 })}
        active={currentPage === 1 || currentPage === undefined}
      >
        {toFarsiNumber(1)}
      </PaginationButton>
      {renderButtons()}
      {/**Last page */}
      {totalPages !== 1 && (
        <PaginationButton
          onClick={() => handleFilterChange({ page: totalPages })}
          active={currentPage === totalPages}
        >
          {toFarsiNumber(totalPages)}
        </PaginationButton>
      )}
      <PaginationButton
        onClick={() => {
          if (currentPage < totalPages) {
            handleFilterChange({ page: currentPage + 1 });
          }
        }}
      >
        <MdArrowBack />
      </PaginationButton>
    </div>
  );
};

interface PaginationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const PaginationButton = ({ active, ...rest }: PaginationButtonProps) => {
  return (
    <button
      className={`min-w-[25px] cursor-pointer hover:opacity-70 transition rounded-lg${
        active ? " hover:opacity-100 bg-primary text-white" : ""
      }`}
      {...rest}
      disabled={active}
    >
      <span>{rest.children}</span>
    </button>
  );
};
