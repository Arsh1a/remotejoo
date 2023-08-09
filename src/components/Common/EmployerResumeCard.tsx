import { ResumeType, SentResumeType, SentResumesStatusType } from "@/types";
import React from "react";
import CompanyLogo from "./CompanyLogo";
import { sentResumeStatusLabels } from "@/constants/ui.constants";
import { convertISODateToPersianDate } from "@/utils/utils";
import Button from "./Button";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchData, postData } from "@/utils/api";
import LoadingAnimation from "./LoadingAnimation";
import { toast } from "react-hot-toast";

interface Props {
  data: ResumeType;
}

const EmployerResumeCard = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (passedData: { status: SentResumesStatusType }) =>
      patchData(`/resumes/${data.id}`, passedData),
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["job-resumes"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleResumeUpdate = (status: SentResumesStatusType) => {
    mutate({ status });
  };

  return (
    <div className="flex gap-5 relative flex-col sm:flex-row rounded-primary p-6 w-full bg-white items-center">
      {isLoading && (
        <div className="w-full absolute h-full rounded-primary bg-white bg-opacity-90 z-10 p-6 flex items-center justify-center right-0">
          <LoadingAnimation />
        </div>
      )}
      <div className="flex flex-col">
        <div>نام: {data.name}</div>
        <div>شماره تلفن: {data.phoneNumber}</div>
        <div>
          تاریخ ارسال درخواست: {convertISODateToPersianDate(data.createdAt)}
        </div>
        <div>توضیحات: {data.description ?? "-"}</div>
        <div style={{ color: sentResumeStatusLabels[data.status].color }}>
          {sentResumeStatusLabels[data.status].label}
        </div>
      </div>
      <div className="flex flex-col mr-auto gap-2">
        <Link
          className="self-center w-full"
          href={`/resume/${data.resumePdf}`}
          target="_blank"
        >
          <Button
            variant="black"
            className="w-full"
            onClick={() => handleResumeUpdate("SEEN")}
          >
            مشاهده رزومه
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button
            className="self-center flex-1 !py-1"
            onClick={() => handleResumeUpdate("ACCEPTED")}
          >
            تأیید
          </Button>
          <Button
            variant="clean"
            className="self-center bg-red-500 text-white flex-1 !py-1"
            onClick={() => handleResumeUpdate("REJECTED")}
          >
            رد
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployerResumeCard;
