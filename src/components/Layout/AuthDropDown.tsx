import { authDropDownLinks } from "@/constants/links.constants";
import useAuthStore from "@/context/useAuthStore";
import useAppMutation from "@/hooks/useAppMutation";
import { UserType } from "@/types";
import { postData, postDataWithoutRetry } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";

interface Props {
  data: UserType | null;
}

const AuthDropDown = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const contextReset = useAuthStore((state) => state.contextReset);

  const { mutate, isLoading } = useAppMutation({
    mutationFn: (data) => postData("/auth/logout", {}),
    successFn: () => {
      contextReset();
    },
    successMessage: "از حساب کاربری خود خارج شدید.",
    invalidateQueryKeys: ["auth"],
  });

  return (
    <div className="group relative">
      <div
        className="font-semibold cursor-pointer gap-1 flex items-center justify-center hover:opacity-70 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdPerson size={24} />
        <span className="truncate max-w-[110px]">
          {data?.firstName} {data?.lastName}
        </span>
      </div>
      <ul
        className={`absolute z-50 left-0 flex-col gap-2 bg-white text-black min-w-[10rem] p-4 rounded-secondary${
          isOpen ? " flex" : " hidden"
        }`}
      >
        {authDropDownLinks.map((l) => (
          <li
            key={l.url}
            className="w-full"
            onClick={(e) => {
              setIsOpen(false);
            }}
          >
            <Link
              onClick={() => {
                l.label === "خروج" ? mutate() : null;
              }}
              href={l.url}
              className="flex hover:opacity-70 transition w-full"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthDropDown;
