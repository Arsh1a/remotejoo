import { data } from "autoprefixer";
import Link from "next/link";
import React from "react";
import Button from "../Common/Button";
import { InternalJobType, JobType } from "@/types";
import { FaEdit } from "react-icons/fa";
import LoadingAnimation from "../Common/LoadingAnimation";

interface Props {
  data: JobType & InternalJobType;
  isUserJobOwner: boolean;
  isResumeAlreadySent: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const SendResumeButton = ({
  data,
  isUserJobOwner,
  isResumeAlreadySent,
  setIsModalOpen,
  isLoading,
}: Props) => {
  if (isLoading) {
    return (
      <div className="w-full items-center justify-center flex">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <>
      {isUserJobOwner ? (
        <Link href={`/panel/employer/edit/${data.slug}`} className="self-start">
          <Button className="flex items-center gap-1" variant="black">
            <FaEdit />
            ویرایش
          </Button>
        </Link>
      ) : (
        <Button
          variant="primary"
          disabled={isResumeAlreadySent || data.status === "EXPIRED"}
          onClick={() => setIsModalOpen(true)}
        >
          {isResumeAlreadySent
            ? "رزومه ارسال شده است"
            : data.status === "EXPIRED"
            ? "آگهی منقضی شده است"
            : "ارسال رزومه"}
        </Button>
      )}
    </>
  );
};

export default SendResumeButton;
