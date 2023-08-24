import { InternalJobType, JobType } from "@/types";
import React from "react";
import CompanyLogo from "../Common/CompanyLogo";
import { toFarsiNumber } from "@/utils/utils";
import Button from "../Common/Button";
import Link from "next/link";

interface Props {
  data: JobType & InternalJobType;
}

const CompanyInfo = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center bg-main px-4 py-6 h-[350px] text-white rounded-secondary">
      <CompanyLogo
        companyLogo={`${process.env.NEXT_PUBLIC_ASSETS_URI}/${data.company.logo}`}
        companyName={data.company.name}
        height={100}
        width={100}
      />
      <h2 className="text-xl font-bold">{data.company.name}</h2>
      {data.company.website && (
        <a className="hover:opacity-70 transition" href={data.company.website}>
          {data.company.website}
        </a>
      )}
      <span className="text-sm">
        تعداد آگهی منتشر کرده: {toFarsiNumber(data.company.jobsPostedCount)}
      </span>
      <Link href={`/company/${data.company.slug}`}>
        <Button variant="white" className="text-lg">
          مشاهده پروفایل شرکت
        </Button>
      </Link>
    </div>
  );
};

export default CompanyInfo;
