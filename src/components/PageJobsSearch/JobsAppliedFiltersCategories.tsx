import { categories, origins } from "@/constants/ui.constants";
import { FilterType } from "@/types";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { MdClear } from "react-icons/md";

interface Props {
  filters: FilterType;
  handleFilterChange: (filterObj: FilterType) => void;
}

const JobsAppliedFiltersCategories = ({
  filters,
  handleFilterChange,
}: Props) => {
  //Turns filter object to array of label and values + removes page and limit cause we dont want them in categories
  const [appliedFilters, setAppliedFilters] = useState<(string | number)[]>([]);

  return <div className="flex gap-2 flex-wrap"></div>;
};

export default JobsAppliedFiltersCategories;

interface AppliedFilterProps extends ComponentPropsWithoutRef<"span"> {
  children: React.ReactNode;
}

const AppliedFilter = ({ children, ...rest }: AppliedFilterProps) => {
  return (
    <span
      className="px-2 py-1 flex gap-1 items-center bg-black text-white rounded-full text-sm cursor-pointer hover:opacity-70 transition"
      {...rest}
    >
      {children} <MdClear />
    </span>
  );
};
