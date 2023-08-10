import Button from "@/components/Common/Button";
import ErrorMessage from "@/components/Common/ErrorMessage";
import InputError from "@/components/Common/InputError";
import ListBoxDropdown from "@/components/Common/ListBoxDropdown";
import LoadingAnimation from "@/components/Common/LoadingAnimation";
import Metadata from "@/components/Common/Metadata";
import RichTextEditor from "@/components/Common/RichTextEditor";
import TextInput from "@/components/Common/TextInput";
import JobForm from "@/components/PagePanel/PagePanelEmployer/JobForm";
import PanelCard from "@/components/PagePanel/PanelCard";
import { tags } from "@/constants/ui.constants";
import useAppMutation from "@/hooks/useAppMutation";
import { TagType, UserType } from "@/types";
import { getData, postData } from "@/utils/api";
import { removeEmptyFields, toFarsiNumber } from "@/utils/utils";
import { wordifyfa } from "@/utils/wordifyfa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, SetStateAction, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

type CreateJobType = {
  title: string;
  tag: TagType;
  salary?: string | number;
  description: string;
};

export default function CreateJobPage() {
  const [userHasCompany, setUserHasCompany] = useState(true);
  const [selectedTag, setSelectedTag] = useState<null | string>(null);

  const router = useRouter();

  const { data: userData } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getData<UserType>("/auth/me"),
    onSuccess: (res) => {},
  });

  const {
    error: queryError,
    data: queryData,
    isLoading: queryLoading,
  } = useQuery({
    queryKey: ["user-company"],
    queryFn: () => getData("/companies/user"),
    onError: (error: any) => {
      setUserHasCompany(false);
    },
  });

  const {
    error,
    isLoading: mutationLoading,
    mutate,
  } = useAppMutation({
    mutationFn: (data: CreateJobType) => postData("/jobs", data),
    successFn: async () => {
      await router.push("/panel/employer");
    },
    invalidateQueryKeys: ["my-jobs"],
    successMessage: "آگهی با موفقیت ایجاد شد.",
  });

  const onSubmit: SubmitHandler<any> = async (
    data: CreateJobType,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e!.preventDefault();
    const sanitizedData = removeEmptyFields(data);
    mutate(sanitizedData);
  };

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <PanelCard
      title="ایجاد آگهی"
      isLoading={queryLoading}
      userIsVerified={userData?.data.isVerified}
    >
      <Metadata
        title="ایجاد آگهی"
        url={"panel/employer/create"}
        description={"ایجاد آگهی"}
      />
      {userHasCompany ? (
        <JobForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          fieldErrors={errors}
          error={error}
          register={register}
          control={control}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          isLoading={mutationLoading}
        />
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <h3>لطفا اول پروفایل شرکت خود را ایجاد کنید.</h3>
          <Link href="/panel/employer/company">
            <Button variant="primary">ایجاد شرکت</Button>
          </Link>
        </div>
      )}
    </PanelCard>
  );
}
