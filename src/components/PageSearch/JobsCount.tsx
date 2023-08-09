import { JobFetchType } from "@/types";
import { toFarsiNumber } from "@/utils/utils";
import React from "react";

interface Props {
  data: JobFetchType;
}

const JobsCount = ({ data }: Props) => {
  return (
    <>
      {data.jobs.length > 0 && (
        <div className="flex justify-between">
          <span>
            {toFarsiNumber(data.totalJobs)} فرصت شغلی دورکاری یافت شد.
          </span>
        </div>
      )}
    </>
  );
};

export default JobsCount;
