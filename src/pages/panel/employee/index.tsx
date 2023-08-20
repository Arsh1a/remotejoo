import Button from "@/components/Common/Button";
import DataNotFound from "@/components/Common/DataNotFound";
import Metadata from "@/components/Common/Metadata";
import SentResumeCard from "@/components/Common/SentResumeCard";
import Tabs from "@/components/Common/Tabs";
import PanelCard from "@/components/PagePanel/PanelCard";
import {
  InternalJobStatusType,
  InternalJobType,
  JobType,
  SentResumesStatusType,
  SentResumeType,
} from "@/types";
import { getData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const tabs = [
  {
    label: "همه",
    value: "ALL",
  },
  {
    label: "در انتظار بررسی",
    value: "SENT",
  },
  {
    label: "بررسی‌شده",
    value: "SEEN",
  },
  {
    label: "تأیید برای مصاحبه",
    value: "ACCEPTED",
  },
  {
    label: "رد شده",
    value: "REJECTED",
  },
];

export default function EmployeePage() {
  const [status, setStatus] = useState<SentResumesStatusType | "ALL">("ALL");

  const { data: queryData, isLoading } = useQuery({
    queryKey: ["my-resumes", status],
    queryFn: () =>
      getData<SentResumeType[]>(
        `/resumes?${status !== "ALL" ? `status=${status}` : ""}`
      ),
    onError: (error: any) => {},
    enabled: !!status,
  });
  let data = queryData?.data ?? [];

  return (
    <PanelCard
      title="درخواست های من"
      isLoading={isLoading}
      background="transparent"
    >
      <Metadata
        title="درخواست های من"
        url={"panel/employee"}
        description="درخواست های من"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <span>مشاهده:</span>
          <Tabs tabs={tabs} state={status} setState={setStatus} />
        </div>
        {data.length > 0 ? (
          <div className="flex flex-col lg:gap-6">
            {data.map((resume) => (
              <SentResumeCard key={resume.id} data={resume} />
            ))}
          </div>
        ) : (
          <DataNotFound
            text={
              <div className="flex gap-2 items-center flex-col">
                موردی برای نمایش وجود ندارد.
                <Link href="/jobs">
                  <Button variant="primary">جستجوی مشاغل</Button>
                </Link>
              </div>
            }
          />
        )}
      </div>
    </PanelCard>
  );
}
