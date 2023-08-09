import Button from "@/components/Common/Button";
import ErrorMessage from "@/components/Common/ErrorMessage";
import InputError from "@/components/Common/InputError";
import ListBoxDropdown from "@/components/Common/ListBoxDropdown";
import LoadingAnimation from "@/components/Common/LoadingAnimation";
import RichTextEditor from "@/components/Common/RichTextEditor";
import TextInput from "@/components/Common/TextInput";
import { tags } from "@/constants/ui.constants";
import React, { Dispatch, SetStateAction } from "react";
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
  selectedTag: string | null;
  setSelectedTag: Dispatch<SetStateAction<string | null>>;
  isLoading: boolean;
  loadedRTEContent?: string;
  error: unknown | string;
}

const tagDropDownData = Object.entries(tags).map(([key, value]) => ({
  label: value.label,
  value: key,
}));

const JobForm = ({
  handleSubmit,
  onSubmit,
  fieldErrors,
  register,
  control,
  selectedTag,
  setSelectedTag,
  isLoading,
  loadedRTEContent,
  error,
}: Props) => {
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor="tag">
            دسته‌بندی<span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            defaultValue={null}
            name="tag"
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <ListBoxDropdown
                value={selectedTag}
                data={tagDropDownData}
                error={"tag" in fieldErrors}
                onChange={(e: SetStateAction<string | null>) => {
                  onChange(e);
                  setSelectedTag(e);
                }}
              />
            )}
          />
          {fieldErrors.tag?.type === "required" && (
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
              loadedContent={loadedRTEContent ?? field.value}
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
        <Button
          type="submit"
          className="mr-auto flex items-center gap-2"
          variant="primary"
        >
          ایجاد آگهی و انتشار
          <FaArrowLeft />
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

export default JobForm;
