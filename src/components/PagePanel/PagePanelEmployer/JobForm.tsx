import Button from "@/components/Common/Button";
import ErrorMessage from "@/components/Common/ErrorMessage";
import InputError from "@/components/Common/InputError";
import ListBoxDropdown from "@/components/Common/ListBoxDropdown";
import LoadingAnimation from "@/components/Common/LoadingAnimation";
import Modal from "@/components/Common/Modal";
import RichTextEditor from "@/components/Common/RichTextEditor";
import TextInput from "@/components/Common/TextInput";
import { categories } from "@/constants/ui.constants";
import useAppMutation from "@/hooks/useAppMutation";
import { InternalJobType, JobType } from "@/types";
import { patchData } from "@/utils/api";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";

interface Props {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: SubmitHandler<any>;
  fieldErrors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
  isLoading: boolean;
  loadedJobData?: (JobType & InternalJobType) | null;
  error: unknown | string;
}

const categoryDropDownData = Object.entries(categories).map(([key, value]) => ({
  label: value.label,
  value: key,
}));

const JobForm = ({
  handleSubmit,
  onSubmit,
  fieldErrors,
  register,
  control,
  selectedCategory,
  setSelectedCategory,
  isLoading,
  loadedJobData,
  error,
}: Props) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const router = useRouter();

  const { mutate, isLoading: mutationIsLoading } = useAppMutation({
    mutationFn: () => patchData(`/jobs/expire/${loadedJobData?.slug}`, {}),
    invalidateQueryKeys: ["job-resumes"],
    successFn: () => {
      router.push("/panel/employer");
    },
    successMessage: "آگهی با موفقیت حذف شد.",
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <Modal
        title="حذف آگهی"
        content={
          <div className="flex flex-col gap-2 items-center">
            <span>آیا با حذف این آگهی موافقید؟</span>
            <span className="font-bold text-red-500">
              بعد از حذف آگهی، امکان بازگرداندن وجود ندارد.
            </span>
            <div className="flex gap-5">
              <Button
                onClick={() => {
                  setIsRemoveModalOpen(false);
                }}
              >
                انصراف
              </Button>
              <Button variant="red" onClick={() => mutate()}>
                حذف آگهی
              </Button>
            </div>
          </div>
        }
        isOpen={isRemoveModalOpen}
        setIsOpen={setIsRemoveModalOpen}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="title">
          عنوان آگهی<span className="text-red-500">*</span>
        </label>
        <TextInput
          id="title"
          placeholder="مثلا: برنامه نویس React.js"
          error={"title" in fieldErrors}
          {...register("title", {
            required: true,
            maxLength: 80,
            minLength: 8,
          })}
        />
        {fieldErrors.title?.type === "required" && (
          <InputError message={"لطفا عنوان آگهی را وارد کنید."} />
        )}
        {fieldErrors.title?.type === "maxLength" && (
          <InputError message={"عنوان آگهی نباید بیشنر از 80 کاراکتر باشد."} />
        )}
        {fieldErrors.title?.type === "minLength" && (
          <InputError message={"عنوان آگهی نباید کمتر از 8 کاراکتر باشد."} />
        )}
      </div>
      <div className="flex w-full flex-col md:flex-row gap-8">
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="category">
            دسته‌بندی<span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            defaultValue={null}
            name="category"
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <ListBoxDropdown
                value={selectedCategory}
                data={categoryDropDownData}
                error={"category" in fieldErrors}
                onChange={(e: SetStateAction<string | null>) => {
                  onChange(e);
                  setSelectedCategory(e);
                }}
              />
            )}
          />
          {fieldErrors.category?.type === "required" && (
            <InputError message={"لطفا دسته‌بندی را انتخاب کنید."} />
          )}
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="salary">
            حداقل حقوق<span className="text-sm">(تومان)</span>
          </label>
          <TextInput
            id="salary"
            placeholder="مثلا: ۱۵۰۰۰۰۰۰"
            type="number"
            error={"salary" in fieldErrors}
            {...register("salary", {
              valueAsNumber: true,
              validate: (value) => value >= 5000000 || Number.isNaN(value),
            })}
          />
          {fieldErrors.salary?.type === "valueAsNumber" && (
            <InputError message={"لطفا عدد وارد کنید."} />
          )}
          {fieldErrors.salary?.type === "validate" && (
            <InputError
              message={"حقوق نمی تواند کمتر از ۵ میلیون تومان باشد. 😊"}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <label htmlFor="description">
          شرح شغل<span className="text-red-500">*</span>
        </label>
        <Controller
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <RichTextEditor
              loadedContent={loadedJobData?.description ?? field.value}
              onChange={field.onChange}
              error={"description" in fieldErrors}
            />
          )}
          {...register("description", {
            required: true,
            minLength: 100,
            maxLength: 5000,
          })}
          name="description"
        />
        {fieldErrors.description?.type === "required" && (
          <InputError message={"لطفا موقعیت شغلی را شرح دهید."} />
        )}
        {fieldErrors.description?.type === "minLength" && (
          <InputError message={"توضیحات نباید کمتر از 1000 کاراکتر باشد."} />
        )}
        {fieldErrors.description?.type === "maxLength" && (
          <InputError message={"توضیحات نباید بیشتر از 5000 کاراکتر باشد."} />
        )}
      </div>
      <div className="flex">
        {loadedJobData && (
          <Button
            variant="red"
            onClick={() => setIsRemoveModalOpen(true)}
            type="button"
          >
            حذف آگهی
          </Button>
        )}
        <Button
          isLoading={isLoading}
          type="submit"
          className="mr-auto flex items-center gap-2"
          variant="primary"
        >
          ثبت آگهی
          <FaArrowLeft />
        </Button>
      </div>
      <ErrorMessage error={error} />
    </form>
  );
};

export default JobForm;
