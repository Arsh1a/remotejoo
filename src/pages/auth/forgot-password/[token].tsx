import Button from "@/components/Common/Button";
import Container from "@/components/Common/Container";
import Logo from "@/components/Common/Logo";
import Metadata from "@/components/Common/Metadata";
import TextInput from "@/components/Common/TextInput";
import PageAuthWrapper from "@/components/PageAuth/PageAuthWrapper";
import useAppMutation from "@/hooks/useAppMutation";
import { postDataWithoutRetry } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type ForgotPasswordChangePasswordPageType = {
  password: string;
  repeatPassword: string;
};

export default function ForgotPasswordChangePasswordPage() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm<ForgotPasswordChangePasswordPageType>();

  const { mutate } = useAppMutation({
    mutationFn: (data: ForgotPasswordChangePasswordPageType) =>
      postDataWithoutRetry(`/auth/forgot-password/${router.query.token}`, data),
    successFn: () => {
      router.push("/auth/login");
    },
    successMessage: "رمز عبور با موفقیت تغییر کرد.",
  });

  const onSubmit: SubmitHandler<ForgotPasswordChangePasswordPageType> = async (
    data: ForgotPasswordChangePasswordPageType,
    e: any
  ) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <Metadata
        title="تغییر رمز عبور"
        description="تغییر رمز عبور"
        url="auth/forgot-password"
      />
      <form
        className="flex flex-col items-center justify-center gap-4 p-5 rounded-primary bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="password">رمز عبور جدید</label>
          <TextInput
            id="password"
            type="password"
            error={"password" in errors}
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 128,
            })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="repeatPassword">تکرار رمز عبور جدید</label>
          <TextInput
            id="repeatPassword"
            type="repeatPassword"
            error={"repeatPassword" in errors}
            {...register("repeatPassword", {
              required: true,
              minLength: 8,
              maxLength: 128,
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "رمز عبور با تاییدیه مطابقت ندارد.";
                }
              },
            })}
          />
        </div>
        <Button type="submit">تغییر رمز عبور</Button>
      </form>
    </Container>
  );
}
