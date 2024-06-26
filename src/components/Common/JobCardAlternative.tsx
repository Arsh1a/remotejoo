import { origins, categories } from "@/constants/ui.constants";
import { JobType } from "@/types";
import { passedDays, toFarsiNumber, truncateString } from "@/utils/utils";
import React from "react";
import Button, { ButtonVariant } from "./Button";
import CompanyLogo from "./CompanyLogo";

type Props = JobType & {
  buttonVariant?: ButtonVariant;
  aditionalContent?: React.ReactNode;
};

const JobCardAlternative = ({
  buttonVariant = "primary",
  aditionalContent,
  ...rest
}: Props) => {
  const isPublishedInternally = false;
  const category = categories[rest.category].label;
  const companyLogo = rest.companyLogo;
  const companyName = rest.companyName;

  return (
    <article className="bg-white rounded-primary p-6 relative flex flex-col gap-4 justify-center">
      <span className="text-sm text-left sm:text-center absolute w-max left-0 top-0 pt-6 pl-6 text-black rounded-full font-semibold">
        {passedDays(rest.passedDays)} در{" "}
        <span
          className={
            isPublishedInternally ? "text-transparent bg-clip-text bg-main" : ""
          }
          style={{ color: origins[rest.origin].color }}
        >
          {origins[rest.origin].label}
        </span>
      </span>
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex flex-col sm:flex-row gap-x-2">
          <CompanyLogo
            width={40}
            height={40}
            companyLogo={companyLogo}
            companyName={companyName}
          />
          <div className="flex flex-col gap-1">
            <p>{companyName}</p>
            <a
              title={rest.title}
              href={rest.link}
              target="_blank"
              rel="noreferrer"
              className="font-bold word-break text-xl hover:opacity-70 transition"
            >
              {truncateString(rest.title, 45)}
            </a>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="rounded-full px-2 border self-start border-neutral-500 text-neutral-500">
                <span className="text-sm">{category}</span>
              </div>
              {rest.salary ? (
                <span className="text-sm">
                  حقوق از {toFarsiNumber(rest.salary.toLocaleString())} تومان
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 relative mt-5">
          <div className="mr-auto mt-auto flex flex-col items-end gap-2">
            <a href={rest.link} target="_blank" rel="noreferrer">
              <Button variant={buttonVariant}>مشاهده</Button>
            </a>
          </div>
        </div>
      </div>
      {aditionalContent && <div>{aditionalContent}</div>}
    </article>
  );
};

export default JobCardAlternative;
