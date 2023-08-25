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
import Link from "next/link";
import useAppMutation from "@/hooks/useAppMutation";
import Metadata from "@/components/Common/Metadata";

type CreateCompanyType = {
  name: string;
  logo?: string;
  phoneNumber: string | number;
  website?: string;
  description?: string;
};

export default function CreateCompanyPage() {
  const [logoUri, setLogoUri] = useState("");
  const [loadedCompanyData, setLoadedCompanyData] =
    useState<CompanyType | null>(null);
  const [isLogoUriLoading, setIsLogoUriLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const router = useRouter();

  const { data: userData } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getData<UserType>("/auth/me"),
    onSuccess: (res) => {},
  });

  const loadedCompanyQuery = useQuery({
    queryKey: ["my-company"],
    queryFn: () => getData<CompanyType>("/companies/user"),
    onSuccess: (res) => {
      setIsLoading(false);
      setLoadedCompanyData(res.data);
    },
    onError: () => {
      setIsLoading(false);
      setLoadedCompanyData(null);
    },
  });

  const {
    error: createError,
    isLoading: createIsLoading,
    mutate: createMutate,
  } = useAppMutation({
    mutationFn: (data: CreateCompanyType) => postData("/companies", data),
    successFn: async () => {
      setIsLoading(false);
      await router.push("/panel/employer");
    },
    onError: () => {
      setIsLoading(false);
    },
    successMessage: "شرکت با موفقیت ایجاد شد.",
    invalidateQueryKeys: ["my-company"],
  });
  const {
    error: updateError,
    isLoading: updateIsLoading,
    mutate: updateMutate,
  } = useAppMutation({
    mutationFn: (data: CreateCompanyType) =>
      patchData(`/companies/${loadedCompanyData?.id}`, data),
    successFn: async () => {
      await router.push("/panel/employer");
    },
    invalidateQueryKeys: ["my-company", "my-jobs"],
    successMessage: "شرکت با موفقیت ویرایش شد.",
  });

  const onSubmit: SubmitHandler<any> = async (
    data: CreateCompanyType,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e!.preventDefault();
    const sanitizedData = removeEmptyFields(data);
    setIsLoading(true);
    if (loadedCompanyData) {
      updateMutate({ ...sanitizedData, logo: logoUri });
    } else {
      createMutate({ ...sanitizedData, logo: logoUri });
    }
  };

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
    if (loadedCompanyData) {
      reset(loadedCompanyData);
      setValue("file", "value");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedCompanyData]);

  return (
    <PanelCard
      isLoading={loadedCompanyQuery.isLoading}
      title="پروفایل شرکت"
      userIsVerified={userData?.data.isVerified}
    >
      <Metadata
        title="پروفایل شرکت"
        url={"panel/employer/company"}
        description={"پروفایل شرکت"}
      />
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">
            نام شرکت<span className="text-red-500">*</span>
          </label>
          <TextInput
            id="name"
            placeholder="مثلا: ریموتجو"
            error={"name" in errors}
            {...register("name", {
              required: true,
              maxLength: 40,
              minLength: 3,
            })}
          />
          {errors.name?.type === "required" && (
            <InputError message={"لطفا نام شرکت را وارد کنید."} />
          )}
          {errors.name?.type === "maxLength" && (
            <InputError message={" نام شرکت نباید بیشنر از 40 کاراکتر باشد."} />
          )}
          {errors.name?.type === "minLength" && (
            <InputError message={"عنوان آگهی نباید کمتر از 3 کاراکتر باشد."} />
          )}
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="phoneNumber">
            شماره تماس<span className="text-sm">(محرمانه)</span>
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
            <InputError message={"لطفا شماره تلفن شرکت را وارد کنید."} />
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
            لوگو شرکت<span className="text-red-500">*</span>
          </label>
          <CompanyImageUpload
            loadedCompanyImage={loadedCompanyData?.logo}
            passFileFn={setLogoUri}
            error={"file" in errors}
            passLoadingFn={setIsLogoUriLoading}
            clearErrors={clearErrors}
            setValue={setValue}
            {...register("file", {
              required: true,
            })}
          />
          {errors.file?.type === "required" && (
            <InputError message={"لطفا لوگو شرکت خود را آپلود کنید."} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="website">آدرس وبسایت</label>
          <TextInput
            id="website"
            placeholder="مثلا: remotejoo.ir"
            error={"website" in errors}
            {...register("website", {
              maxLength: 80,
              pattern:
                /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            })}
          />
          {errors.website?.type === "pattern" && (
            <InputError message={"آدرس وبسایت صحیح نمی باشد."} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">معرفی شرکت</label>
          <TextArea
            rows={10}
            id="description"
            error={"description" in errors}
            {...register("description", {
              minLength: 100,
              maxLength: 1000,
            })}
          />
          {errors.description?.type === "minLength" && (
            <InputError message={"توضیحات نباید کمتر از 100 کاراکتر باشد."} />
          )}
          {errors.description?.type === "maxLength" && (
            <InputError message={"توضیحات نباید بیشتر از 1000 کاراکتر باشد."} />
          )}
        </div>
        <div className="flex justify-end gap-2">
          {loadedCompanyData && (
            <Link
              target="_blank"
              rel="noreferrer"
              href={`/company/${loadedCompanyData?.slug}`}
            >
              <Button variant="black">مشاهده پروفایل شرکت</Button>
            </Link>
          )}
          <Button
            disabled={isLogoUriLoading}
            isLoading={isLoading || isLogoUriLoading}
            type="submit"
            className="flex items-center gap-2"
            variant="primary"
          >
            ذخیره
          </Button>
        </div>
        <ErrorMessage error={error} />
      </form>
    </PanelCard>
  );
}
