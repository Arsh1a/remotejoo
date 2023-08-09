import Button from "@/components/Common/Button";
import DataNotFound from "@/components/Common/DataNotFound";
import Tabs from "@/components/Common/Tabs";
import JobCardWithOptions from "@/components/PagePanel/PagePanelEmployer/JobCardWithOptions";
import PanelCard from "@/components/PagePanel/PanelCard";
import { jobStatusLabels } from "@/constants/ui.constants";
import { InternalJobStatusType, InternalJobType, JobType } from "@/types";
import { getData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

const tabs = [
  { label: "همه", value: "ALL" },
  ...Object.entries(jobStatusLabels).map(([value, { label }]) => ({
    label,
    value,
  })),
];

export default function EmployerPage() {
  const [status, setStatus] = useState<InternalJobStatusType | "ALL">("ALL");

  const { data: queryData, isLoading } = useQuery({
    queryKey: ["my-jobs", status],
    queryFn: () =>
      getData<(JobType & InternalJobType)[]>(
        `/jobs/user/me?${status !== "ALL" ? `status=${status}` : ""}`
      ),
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    enabled: !!status,
  });
  let data = queryData?.data ?? [];

  return (
    <PanelCard
      title="آگهی های ایجاد شده"
      background="transparent"
      isLoading={isLoading}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <span>مشاهده:</span>
          <Tabs tabs={tabs} state={status} setState={setStatus} />
        </div>
        {data.length > 0 ? (
          <div className="flex flex-col gap-6">
            {data.map((job) => (
              <JobCardWithOptions key={job.slug} {...job} />
            ))}
          </div>
        ) : (
          <DataNotFound
            text={
              <div className="flex gap-2 items-center flex-col">
                شما آگهی ندارید.
                <Link href="/panel/employer/create">
                  <Button variant="primary">ایجاد آگهی</Button>
                </Link>
              </div>
            }
          />
        )}
      </div>
    </PanelCard>
  );
}
