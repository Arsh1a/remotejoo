import Button from "@/components/Common/Button";
import ErrorMessage from "@/components/Common/ErrorMessage";
import CompanyImageUpload from "@/components/PagePanel/PagePanelEmployer/CompanyImageUpload";
import InputError from "@/components/Common/InputError";
import LoadingAnimation from "@/components/Common/LoadingAnimation";
import TextArea from "@/components/Common/TextArea";
import TextInput from "@/components/Common/TextInput";
import PanelCard from "@/components/PagePanel/PanelCard";
import { getData, postData, patchData } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseSyntheticEvent, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { removeEmptyFields } from "@/utils/utils";
import toast from "react-hot-toast";
import { CompanyType, UserType } from "@/types";
import { useRouter } from "next/router";
import ResumeUpload from "./ResumeUpload";
import Link from "next/link";

type CreateResumeType = {
  name: string;
  resumePdf: string;
  phoneNumber: string | number;
  description?: string;
  jobId: string;
};

interface Props {
  jobId: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendResumeForm = ({ jobId, setIsModalOpen }: Props) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [loadedUserData, setLoadedUserData] = useState<UserType | null>(null);
  const [isLogoUriLoading, setIsLogoUriLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resumeFieldEmptyError, setResumeFieldEmptyError] = useState<
    boolean | undefined
  >(undefined);
  const queryClient = useQueryClient();

  console.log(pdfUrl);

  const router = useRouter();

  const loadedUserQuery = useQuery({
    queryKey: ["auth"],
    queryFn: () => getData<UserType>("/auth/me", true),
    onSuccess: (res) => {
      setLoadedUserData(res.data);
    },
    onError: () => {
      setLoadedUserData(null);
    },
  });

  const {
    error: createError,
    isLoading: createIsLoading,
    mutate: createMutate,
  } = useMutation({
    mutationFn: (data: CreateResumeType) => postData("/resumes", data),
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success(
        "رزومه با موفقیت ارسال شد. کارفرما بعد از بررسی با شما تماس خواهد گرفت."
      );
      setIsModalOpen(false);
    },
    onError: (err: any) => {
      setError(err.response.data.message[0]);
    },
  });

  const onSubmit: SubmitHandler<any> = async (
    data: CreateResumeType,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e!.preventDefault();

    if (!pdfUrl) {
      setResumeFieldEmptyError(true);
      return;
    }

    const sanitizedData = removeEmptyFields(data);
    createMutate({ ...sanitizedData, resumePdf: pdfUrl, jobId });
  };

  useEffect(() => {
    setResumeFieldEmptyError(false);
  }, [pdfUrl]);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
    clearErrors,
    setValue,
  } = useForm();

  useEffect(() => {
    if (loadedUserData) {
      reset({
        name: `${loadedUserData.firstName} ${loadedUserData.lastName}`,
      });
      setValue("file", "value");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedUserData]);

  if (loadedUserQuery.isLoading) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  console.log(loadedUserData);

  if (!loadedUserData?.isVerified) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <span>لطفا اول حساب کاربری خود را تأیید کنید.</span>
        <Link href="/panel/settings">
          <Button>تنظیمات</Button>
        </Link>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-8 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col flex-1 gap-1">
        <label htmlFor="phoneNumber">
          نام و نام خانوادگی
          <span className="text-red-500">*</span>
        </label>
        <TextInput
          id="name"
          error={"name" in errors}
          {...register("name", {
            required: true,
            maxLength: 256,
          })}
        />
        {errors.name?.type === "required" && (
          <InputError message={"لطفا نام خود را وارد کنید."} />
        )}
        {errors.name?.type === "maxLength" && (
          <InputError message={"نام بلند تر از 256 حرف نمی تواند باشد."} />
        )}
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <label htmlFor="phoneNumber">
          شماره تماس
          <span className="text-red-500">*</span>
        </label>
        <TextInput
          id="phoneNumber"
          error={"phoneNumber" in errors}
          {...register("phoneNumber", {
            required: true,
            maxLength: 20,
            pattern: /^0[0-9]{2,}[0-9]{8}$/,
          })}
        />
        {errors.phoneNumber?.type === "required" && (
          <InputError message={"لطفا شماره تلفن خود را وارد کنید."} />
        )}
        {errors.phoneNumber?.type === "valueAsNumber" && (
          <InputError message={"لطفا عدد وارد کنید."} />
        )}
        {errors.phoneNumber?.type === "pattern" && (
          <InputError message={"لطفا شماره تلفن صحیح وارد کنید."} />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="file">
          فایل رزومه<span className="text-red-500">*</span>
        </label>
        <ResumeUpload
          loadedResume={loadedUserData?.uploadedResume}
          passFileFn={setPdfUrl}
          passFile={pdfUrl}
          error={"file" in errors}
          passLoadingFn={setIsLogoUriLoading}
          clearErrors={clearErrors}
          setValue={setValue}
          {...register("file", {
            required: true,
          })}
        />
        {resumeFieldEmptyError === true && (
          <InputError message={"لطفا رزومه خود را آپلود کنید."} />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description">خود را معرفی کنید</label>
        <TextArea
          rows={5}
          id="description"
          error={"description" in errors}
          {...register("description", {
            minLength: 20,
            maxLength: 200,
          })}
        />
        {errors.description?.type === "minLength" && (
          <InputError message={"توضیحات نباید کمتر از 20 کاراکتر باشد."} />
        )}
        {errors.description?.type === "maxLength" && (
          <InputError message={"توضیحات نباید بیشتر از 200 کاراکتر باشد."} />
        )}
      </div>
      <div className="flex">
        <Button
          disabled={isLogoUriLoading}
          type="submit"
          className="mr-auto flex items-center gap-2"
          variant="primary"
        >
          ارسال رزومه
        </Button>
      </div>
      <ErrorMessage error={error} />
      {isLoading && (
        <div className="flex justify-center items-center">
          <LoadingAnimation />
        </div>
      )}
    </form>
  );
};

export default SendResumeForm;
