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
import { InternalJobType, JobType, TagType } from "@/types";
import { getData, patchData, postData } from "@/utils/api";
import { removeEmptyFields, toFarsiNumber } from "@/utils/utils";
import { wordifyfa } from "@/utils/wordifyfa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, SetStateAction, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi";

type CreateJobType = {
  title: string;
  tag: TagType;
  salary?: string | number;
  description: string;
};

export default function EditJobPage() {
  const [selectedTag, setSelectedTag] = useState<null | string>(null);
  const [loadedJobData, setLoadedJobData] = useState<
    (JobType & InternalJobType) | null
  >(null);

  const router = useRouter();

  const loadedJobQuery = useQuery({
    queryKey: ["my-job"],
    queryFn: () =>
      getData<JobType & InternalJobType>(`/jobs/${router.query.slug}`),
    onSuccess: (res) => {
      setLoadedJobData(res.data);
    },
    onError: () => {
      setLoadedJobData(null);
    },
    enabled: !!router.query.slug,
  });

  const queryClient = useQueryClient();
  const { error, isLoading, mutate } = useAppMutation({
    mutationFn: (data: CreateJobType) =>
      patchData(`/jobs/${loadedJobData?.slug}`, data),
    successFn: () => {
      router.push("/panel/employer");
    },
    successMessage:
      "آگهی با موفقیت ویرایش شد. پس از بررسی, تغییرا اعمال خواهد شد.",
    invalidateQueryKeys: ["my-jobs"],
  });

  useEffect(() => {
    if (loadedJobData) {
      setSelectedTag(loadedJobData.tag);
    }
  }, [loadedJobData]);

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
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  watch();

  useEffect(() => {
    if (loadedJobData) {
      reset({
        ...loadedJobData,
        salary: !loadedJobData.salary ? NaN : loadedJobData.salary,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedJobData]);

  return (
    <PanelCard
      title={`ویرایش آگهی ${
        loadedJobData?.title ? `"${loadedJobData.title}"` : ""
      }`}
      isLoading={loadedJobQuery.isLoading}
    >
      <Metadata
        title={`ویرایش آگهی ${
          loadedJobData?.title ? `"${loadedJobData.title}"` : ""
        }`}
        url={`panel/create/${router.query.slug}`}
        description={"ویرایش آگهی"}
      />
      {loadedJobData?.status === "PUBLISHED" && (
        <span className="text-sm text-red-500 flex items-start gap-1 mb-4">
          <FiAlertCircle size={20} />
          آگهی هم اکنون منتشر شده است. هرگونه تغییر در شرح یا عنوان آن، قبل از
          اعمال ویرایشات، تحت بررسی قرار خواهد گرفت. باقی تغییرات بدون بررسی
          اعمال خواهد شد.
        </span>
      )}
      <JobForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        fieldErrors={errors}
        error={error}
        register={register}
        control={control}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        isLoading={isLoading}
        loadedRTEContent={loadedJobData?.description}
      />
    </PanelCard>
  );
}
