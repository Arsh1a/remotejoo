import { FilterType } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Button from "../Common/Button";
import TextInput from "../Common/TextInput";
import Container from "../Common/Container";
import GradientBackground from "../Common/GradientBackground";

interface Props {
  searchText: string | undefined;
  handleFilterChange: (filterObj: FilterType) => void;
}

const JobTopFilter = ({ searchText, handleFilterChange }: Props) => {
  const [search, setSearch] = useState(searchText ? searchText : "");

  useEffect(() => {
    setSearch(searchText ? searchText : "");
  }, [searchText]);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleFilterChange) {
      handleFilterChange({ text: search });
    } else {
      router.push(`/jobs?text=${search}`);
    }
  };

  return (
    <div className="bg-main border-t border-primary text-white">
      <Container>
        <form onSubmit={(e) => handleSearch(e)} className="flex">
          <div className="flex bg-white p-1 rounded-full">
            <TextInput
              className="focus:!outline-none !ring-0 !p-0 !px-2 min-w-[10rem] text-black !bg-transparent"
              placeholder="عنوان شغلی, مهارت یا..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="clean"
              className="!py-2 !px-2 bg-main flex items-center justify-center md:gap-1"
              type="submit"
            >
              <FiSearch size={18} />
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default JobTopFilter;
