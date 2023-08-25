import React, { BaseSyntheticEvent } from "react";
import SettingsCard from "./SettingsCard";
import TextInput from "@/components/Common/TextInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { removeEmptyFields } from "@/utils/utils";
import { patchData, postData } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "@/components/Common/Button";
import useAppMutation from "@/hooks/useAppMutation";
import InputError from "@/components/Common/InputError";

interface Props {}

type ChangePasswordType = {
  password: string;
  newPassword: string;
};

const ChangePassword = ({}: Props) => {
  const { mutate, isLoading } = useAppMutation({
    mutationFn: (data: ChangePasswordType) =>
      patchData("/auth/change-password", data),
    successFn: () => {
      reset();
    },
    successMessage: "رمز عبور با موفقیت تغییر کرد.",
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (
    data: ChangePasswordType,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e!.preventDefault();
    mutate(data);
  };

  return (
    <SettingsCard title="تغییر رمز عبور" isLoading={isLoading}>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="رمز عبور فعلی"
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 128,
          })}
        />
        <TextInput
          placeholder="رمز عبور جدید"
          type="password"
          {...register("newPassword", {
            required: true,
            minLength: 8,
            maxLength: 128,
          })}
        />
        <TextInput
          placeholder="تکرار رمز عبور جدید"
          type="password"
          {...register("repeatPassword", {
            required: true,
            minLength: 8,
            maxLength: 128,
            validate: (val: string) => {
              if (watch("newPassword") != val) {
                return "رمز عبور با تاییدیه مطابقت ندارد.";
              }
            },
          })}
        />
        {errors.repeatPassword?.type === "validate" && (
          <InputError message={"تکرار رمز عبور مطابقت ندارد."} />
        )}
        <Button type="submit">تغییر رمز عبور</Button>
      </form>
    </SettingsCard>
  );
};

export default ChangePassword;
