import { SentResumeType } from "@/types";
import React from "react";
import CompanyLogo from "./CompanyLogo";
import { sentResumeStatusLabels } from "@/constants/ui.constants";
import { convertISODateToPersianDate } from "@/utils/utils";
import Button from "./Button";
import Link from "next/link";

interface Props {
  data: SentResumeType;
}

const SentResumeCard = ({ data }: Props) => {
  const jobPageUrl = `/jobs/${data.job.slug}/${data.job.title}`;

  return (
    <div className="flex gap-5 rounded-primary p-6 w-full bg-white">
      <Link href={jobPageUrl}>
        <CompanyLogo
          companyLogo={`${process.env.NEXT_PUBLIC_IMAGES_URI}/${data.company.logo}`}
          companyName={data.company.name}
          width={60}
          height={60}
        />
      </Link>
      <div className="flex flex-col">
        <div className="font-semibold">
          <p className="text-sm">{data.company.name}</p>
          <Link
            className="text-primary hover:opacity-70 transition"
            href={jobPageUrl}
          >
            <p className="text-xl">{data.job.title}</p>
          </Link>
        </div>
        <span>
          تاریخ ارسال درخواست: {convertISODateToPersianDate(data.createdAt)}
        </span>
        <span style={{ color: sentResumeStatusLabels[data.status].color }}>
          {sentResumeStatusLabels[data.status].label}
        </span>
      </div>
      <Button className="self-center mr-auto" variant="primary">
        مشاهده جزئیات
      </Button>
    </div>
  );
};

export default SentResumeCard;
