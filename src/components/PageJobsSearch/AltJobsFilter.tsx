import React, { useEffect, useState } from "react";
import { origins, categories } from "@/constants/ui.constants";
import { FilterType, OriginType, CategoryType } from "@/types";
import Checkbox from "../Common/Checkbox";
import { useLoading } from "@/hooks/useLoading";
import LoadingAnimation from "../Common/LoadingAnimation";
import filtersDataHash, { FilterDataHashType } from "./FilersDataHash";

interface Props {
  filters: FilterType;
  handleFilterChange: (filterObj: FilterType) => void;
}

const AltJobsFilter = ({ filters, handleFilterChange }: Props) => {
  const loading = useLoading();

  return (
    <div className="relative w-full md:w-[unset] flex flex-col">
      <div className="min-w-[250px] flex flex-col gap-6 overflow-y-auto">
        {(() => {
          const arr = [];

          for (let key in filtersDataHash) {
            const target = filtersDataHash[key as keyof FilterDataHashType];
            const targetFilter = filters[key as keyof FilterDataHashType];

            arr.push(
              <FilterLabel key={key} isLoading={loading} label={target.label}>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-y-2 gap-x-4">
                  {Object.keys(target.constant).map((constantKey) => (
                    <li key={constantKey} className="flex md:text-lg">
                      <Checkbox
                        name={constantKey}
                        id={constantKey}
                        value={constantKey}
                        onChange={() => {
                          if (
                            targetFilter &&
                            targetFilter.includes(
                              constantKey as keyof typeof target.constant
                            )
                          ) {
                            const removeCategory = (
                              targetFilter as string[]
                            ).filter((f: string) => f !== constantKey);

                            handleFilterChange({ [key]: removeCategory });
                          } else {
                            if (targetFilter) {
                              handleFilterChange({
                                [key]: [...targetFilter, constantKey],
                              });
                            } else {
                              handleFilterChange({
                                [key]: [constantKey],
                              });
                            }
                          }
                        }}
                        checked={
                          targetFilter?.includes(
                            constantKey as keyof typeof target.constant
                          ) ?? false
                        }
                        label={
                          target.constant[
                            constantKey as keyof typeof target.constant
                          ]["label"]
                        }
                      />
                    </li>
                  ))}
                </ul>
              </FilterLabel>
            );
          }
          return arr;
        })()}
      </div>
    </div>
  );
};

export default AltJobsFilter;

interface FilterLabelProps {
  label: string;
  children: React.ReactNode;
  isLoading: boolean;
}

const FilterLabel = ({ children, label, isLoading }: FilterLabelProps) => {
  return (
    <div className="flex relative flex-col gap-2 bg-white p-4 rounded-primary">
      {isLoading && <Loading />}
      <span>{label}</span>
      <div className="pr-4">{children}</div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="absolute w-full h-full -m-4 flex justify-center items-center z-10">
      <div className="absolute w-full h-full bg-white opacity-[0.98] rounded-secondary"></div>
      <LoadingAnimation />
    </div>
  );
};
