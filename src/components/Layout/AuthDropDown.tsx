import { authDropDownLinks } from "@/constants/links.constants";
import useAuthStore from "@/context/useAuthStore";
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
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  useEffect(() => {
    if (isLinkClicked) setIsLinkClicked(false);
  }, [isLinkClicked]);

  const contextReset = useAuthStore((state) => state.contextReset);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data) => postData("/auth/logout", {}),
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      contextReset();
    },
  });

  return (
    <div className="group relative">
      <Link
        href="/panel"
        className="font-semibold gap-1 flex items-center justify-center hover:opacity-70 transition"
      >
        <MdPerson size={24} />
        {data?.firstName} {data?.lastName}
      </Link>
      <ul
        className={`absolute z-50 hidden left-0 group-hover:flex flex-col gap-2 bg-white text-black min-w-[10rem] p-4 rounded-secondary${
          isLinkClicked ? " !hidden" : ""
        }`}
      >
        {authDropDownLinks.map((l) => (
          <li
            key={l.url}
            className="w-full"
            onClick={() => setIsLinkClicked(true)}
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
