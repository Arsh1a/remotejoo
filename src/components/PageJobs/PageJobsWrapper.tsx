import { InternalJobType, JobType, UserType } from "@/types";
import React, { useEffect, useState } from "react";
import Container from "../Common/Container";
import JobInfo from "./JobInfo";
import CompanyInfo from "./CompanyInfo";
import Button from "../Common/Button";
import Modal from "../Common/Modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getData } from "@/utils/api";
import SendResumeForm from "./SendResumeForm";
import Link from "next/link";
import SendResumeButton from "./SendResumeButton";

interface Props {
  data: JobType & InternalJobType;
}

const PageJobsWrapper = ({ data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResumeAlreadySent, setIsResumeAlreadySent] = useState(false);
  const [isUserJobOwner, setIsUserJobOwner] = useState(false);

  const queryClient = useQueryClient();
  const { isLoading, data: userData } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getData<UserType>("/auth/me", true),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["auth"]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // setIsResumeAlreadySent(
    //   userData?.data.sentResumes.find((resume) => resume.jobId === data.id)
    //     ? true
    //     : false
    // );

    if (userData?.data.sentResumes.find((resume) => resume.jobId === data.id)) {
      setIsResumeAlreadySent(true);
    }

    if (data.company.slug === userData?.data.company[0]?.slug) {
      setIsUserJobOwner(true);
    }
  }, [userData]);

  return (
    <Container className="flex flex-col lg:grid grid-cols-4 justify-between gap-y-6 gap-x-10">
      <JobInfo
        isLoading={isLoading}
        data={data}
        isResumeAlreadySent={isResumeAlreadySent}
        isUserJobOwner={isUserJobOwner}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="relative lg:sticky lg:top-4 lg:h-6 flex flex-col gap-4">
        <CompanyInfo data={data} />
        <Modal
          title={`ارسال درخواست همکاری با ${data.company.name}`}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          content={
            userData ? (
              <SendResumeForm jobId={data.id} setIsModalOpen={setIsModalOpen} />
            ) : (
              <div className="flex flex-col text-center items-center justify-center w-full gap-2">
                برای ارسال رزومه باید وارد شوید.
                <Link href="/auth/login">
                  <Button className="!px-6">ورود</Button>
                </Link>
              </div>
            )
          }
        />
      </div>
    </Container>
  );
};

export default PageJobsWrapper;
