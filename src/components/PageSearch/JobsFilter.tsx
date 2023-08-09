import React, { useEffect, useState } from "react";
import { tags } from "@/constants/ui.constants";
import { FilterType, TagType } from "@/types";
import Checkbox from "../Common/Checkbox";
import { useLoading } from "@/hooks/useLoading";
import LoadingAnimation from "../Common/LoadingAnimation";

interface Props {
  filters: FilterType;
  handleFilterChange: (filterObj: FilterType) => void;
}

const JobsFilter = ({ filters, handleFilterChange }: Props) => {
  const [selectedTags, setSelectedTags] = useState<TagType[]>(
    filters.tags ? (filters.tags as TagType[]) : []
  );

  useEffect(() => {
    setSelectedTags(filters.tags ? (filters.tags as TagType[]) : []);
  }, [filters]);

  const loading = useLoading();

  return (
    <div className="relative w-full md:w-[unset] flex flex-col bg-white p-6 rounded-primary">
      {loading && <Loading />}
      <div className="min-w-[250px]">
        <FilterLabel>
          <TagsFilter
            handleFilterChange={handleFilterChange}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </FilterLabel>
      </div>
    </div>
  );
};

export default JobsFilter;

interface TagsFilterProps {
  selectedTags: TagType[];
  setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>;
  handleFilterChange: (filterObj: FilterType) => void;
}

const TagsFilter = ({
  selectedTags,
  setSelectedTags,
  handleFilterChange,
}: TagsFilterProps) => {
  const handleCheckbox = (tag: TagType) => {
    if (selectedTags.includes(tag)) {
      const removeTag = selectedTags.filter((t) => t !== tag);
      setSelectedTags(removeTag);
      handleFilterChange({ tags: removeTag });
    } else {
      setSelectedTags((prev) => [...prev, tag]);
      handleFilterChange({ tags: [...selectedTags, tag] });
    }
  };

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-y-2 gap-x-4">
      {Object.keys(tags).map((tagKey) => (
        <li key={tagKey} className="flex md:text-lg">
          <Checkbox
            name={tagKey}
            id={tagKey}
            value={tagKey}
            onChange={() => handleCheckbox(tagKey as TagType)}
            checked={selectedTags.includes(tagKey as TagType)}
            label={tags[tagKey as TagType].label}
          />
        </li>
      ))}
    </ul>
  );
};

interface FilterLabelProps {
  children: React.ReactNode;
}

const FilterLabel = ({ children }: FilterLabelProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span>دسته بندی</span>
      <div className="pr-4">{children}</div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="absolute w-full h-full flex justify-center items-center z-10 -m-6">
      <div className="absolute w-full h-full bg-white opacity-[0.98] rounded-secondary"></div>
      <LoadingAnimation />
    </div>
  );
};
