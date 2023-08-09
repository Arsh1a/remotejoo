import { InternalJobType, JobType } from "@/types";
import { convertISODateToPersianDate } from "@/utils/utils";
import React from "react";
import Button from "../Common/Button";
import parse from "html-react-parser";
import Modal from "../Common/Modal";
import SendResumeForm from "./SendResumeForm";
import SendResumeButton from "./SendResumeButton";

interface Props {
  data: JobType & InternalJobType;
  isLoading: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isResumeAlreadySent: boolean;
  isUserJobOwner: boolean;
}

const JobInfo = ({
  isLoading,
  data,
  setIsModalOpen,
  isResumeAlreadySent,
  isUserJobOwner,
}: Props) => {
  return (
    <div className="flex flex-col gap-6 col-span-3">
      <div className="flex flex-col gap-6 bg-white rounded-secondary p-6">
        <div>
          <span className="text-sm text-neutral-500">
            منتشر شده در {convertISODateToPersianDate(data.createdAt)}
          </span>
          <h1 className="text-3xl">{data.title}</h1>
        </div>
        <section>
          <h3 className="text-xl font-bold">شرح موقعیت شغلی</h3>
          <div className="tiptap [&>*]:break-words break-words whitespace-pre-wrap">
            {parse(data.description)}
          </div>
        </section>
      </div>
      <section className="flex flex-col bg-white rounded-secondary p-6">
        <h3 className="text-xl font-bold">معرفی شرکت</h3>
        <p className="w-full break-words whitespace-pre-wrap">
          {data.company.description ?? <>این شرکت توضیحاتی ندارد. 😔</>}
        </p>
      </section>
      <div className="mt-auto flex">
        <SendResumeButton
          isLoading={isLoading}
          data={data}
          isResumeAlreadySent={isResumeAlreadySent}
          setIsModalOpen={setIsModalOpen}
          isUserJobOwner={isUserJobOwner}
        />
      </div>
    </div>
  );
};

export default JobInfo;
