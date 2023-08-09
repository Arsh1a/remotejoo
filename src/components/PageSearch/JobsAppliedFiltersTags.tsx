import { tags } from "@/constants/ui.constants";
import { FilterType } from "@/types";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { MdClear } from "react-icons/md";

interface Props {
  filters: FilterType;
  handleFilterChange: (filterObj: FilterType) => void;
}

const convertObjectToArrayOfLabelsAndValues = (obj: FilterType) => {
  return Object.entries(obj)
    .map(([label, value]) => ({ label, value }))
    .filter(
      (obj) => obj.label !== "page" && obj.label !== "limit" && obj.value
    );
};

const JobsAppliedFiltersTags = ({ filters, handleFilterChange }: Props) => {
  //Turns filter object to array of label and values + removes page and limit cause we dont want them in tags
  const [appliedFilters, setAppliedFilters] = useState<
    { label: string; value: any }[]
  >(convertObjectToArrayOfLabelsAndValues(filters));

  useEffect(() => {
    setAppliedFilters(convertObjectToArrayOfLabelsAndValues(filters));
  }, [filters]);

  return (
    <div className="flex gap-2 flex-wrap">
      {appliedFilters.map((f) => {
        //Because we dont have persian label for the tags, we have to use "tags" constant and have to put special if statement for this
        if (f.label === "tags") {
          return f.value.map((v: keyof typeof tags) => (
            <AppliedFilterTag
              onClick={() =>
                handleFilterChange({
                  [f.label]: f.value.filter((arrVal: string) => arrVal !== v),
                })
              }
              key={v}
            >
              {tags[v].label}
            </AppliedFilterTag>
          ));
        }
        return (
          <AppliedFilterTag
            onClick={() => handleFilterChange({ [f.label]: "" })}
            key={f.value}
          >
            {f.value}
          </AppliedFilterTag>
        );
      })}
    </div>
  );
};

export default JobsAppliedFiltersTags;

interface AppliedFIlterTagProps extends ComponentPropsWithoutRef<"span"> {
  children: React.ReactNode;
}

const AppliedFilterTag = ({ children, ...rest }: AppliedFIlterTagProps) => {
  return (
    <span
      className="px-2 py-1 flex gap-1 items-center bg-black text-white rounded-full text-sm cursor-pointer hover:opacity-70 transition"
      {...rest}
    >
      {children} <MdClear />
    </span>
  );
};
