import { origins, categories } from "@/constants/ui.constants";
import { JobType } from "@/types";
import React from "react";
import Button from "./Button";
import {
  convertSpacesToHyphens,
  passedDays,
  toFarsiNumber,
  truncateString,
} from "@/utils/utils";
import { ButtonVariant } from "./Button";
import Link from "next/link";
import CompanyLogo from "./CompanyLogo";
import { FaEdit } from "react-icons/fa";

type Props = JobType & {
  buttonVariant?: ButtonVariant;
  aditionalContent?: React.ReactNode;
};

const JobCard = ({
  buttonVariant = "black",
  aditionalContent,
  ...rest
}: Props) => {
  const cardColor = categories[rest.category].color;
  const isPublishedInternally = rest.origin === "remotejoo";
  const category = categories[rest.category].label;
  const jobURL = isPublishedInternally
    ? `/jobs/${rest.slug}/${convertSpacesToHyphens(rest.title)}`
    : "";

  const companyLogo = isPublishedInternally
    ? `${process.env.NEXT_PUBLIC_ASSETS_URI}/${rest.company.logo}`
    : rest.companyLogo;
  const companyName = isPublishedInternally
    ? rest.company.name
    : rest.companyName;

  return (
    <article className="flex gap-10 border rounded-secondary p-2 pb-4 border-neutral-400">
      <div className="flex flex-col justify-between gap-6 w-full">
        <div
          className="rounded-secondary p-6 gap-6 h-full flex items-start flex-col w-full"
          style={{ backgroundColor: cardColor }}
        >
          <div className="flex items-center justify-between w-full flex-wrap gap-2">
            <span className="text-sm px-3 py-1 bg-white text-black rounded-full font-semibold">
              {passedDays(rest.passedDays)} در{" "}
              <span
                className={
                  isPublishedInternally
                    ? "text-transparent bg-clip-text bg-main"
                    : ""
                }
                style={{ color: origins[rest.origin].color }}
              >
                {origins[rest.origin].label}
              </span>
            </span>
            {isPublishedInternally && (
              <span className="px-3 py-1 font-semibold text-sm bg-main_no_green rounded-full text-white">
                ویژه
              </span>
            )}
          </div>
          <div className="flex items-start gap-2 w-full">
            <CompanyLogo
              width={40}
              height={40}
              companyLogo={companyLogo}
              companyName={companyName}
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold">
                {truncateString(companyName, 30)}
              </span>
              {isPublishedInternally ? (
                <Link
                  title={rest.title}
                  className="font-bold text-xl word-break lg:text-2xl hover:opacity-70 transition"
                  href={jobURL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {truncateString(rest.title, 45)}
                </Link>
              ) : (
                <a
                  title={rest.title}
                  href={rest.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold word-break text-xl lg:text-2xl hover:opacity-70 transition"
                >
                  {truncateString(rest.title, 45)}
                </a>
              )}
            </div>
          </div>
          <div className="mt-auto">
            <div className="rounded-full py-1 px-4 border border-black text-black">
              <span className="text-sm font-bold">{category}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center flex-wrap gap-2">
            {rest.salary ? (
              <span className="text-sm">
                حقوق از {toFarsiNumber(rest.salary.toLocaleString())} تومان
              </span>
            ) : null}
            <div className="mr-auto flex gap-2">
              {isPublishedInternally ? (
                <Link href={jobURL} target="_blank" rel="noreferrer">
                  <Button variant="primary">مشاهده</Button>
                </Link>
              ) : (
                <a href={rest.link} target="_blank" rel="noreferrer">
                  <Button variant={buttonVariant}>مشاهده</Button>
                </a>
              )}
            </div>
          </div>
          {aditionalContent}
        </div>
      </div>
    </article>
  );
};

export default JobCard;
