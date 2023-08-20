import Button from "@/components/Common/Button";
import JobCard from "@/components/Common/JobCard";
import JobCardAlternative from "@/components/Common/JobCardAlternative";
import { jobStatusLabels } from "@/constants/ui.constants";
import { InternalJobStatusType, InternalJobType, JobType } from "@/types";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

type Props = JobType & InternalJobType;

const JobCardWithOptions = ({ ...rest }: Props) => {
  return (
    <JobCardAlternative
      {...rest}
      aditionalContent={
        <JobEmployerOptions slug={rest.slug} status={rest.status} />
      }
    />
  );
};

export default JobCardWithOptions;

interface JobEmployerOptionsProps {
  slug: string;
  status: InternalJobStatusType;
}

const JobEmployerOptions = ({ slug, status }: JobEmployerOptionsProps) => {
  return (
    <div className="flex gap-2 mr-auto items-center justify-end">
      {jobStatusLabels[status].label}
      {status !== "EXPIRED" && (
        <Link href={`/panel/employer/edit/${slug}`}>
          <Button className="flex items-center gap-1" variant="black">
            <FaEdit />
            ویرایش
          </Button>
        </Link>
      )}
      <Link href={`/panel/employer/jobs/${slug}`}>
        <Button className="flex items-center gap-1" variant="black">
          مشاهده رزومه ها
        </Button>
      </Link>
    </div>
  );
};
