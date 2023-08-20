import React, { useState } from "react";
import Button from "../Common/Button";
import TextInput from "../Common/TextInput";
import PageAuthWrapper from "./PageAuthWrapper";
import useAppMutation from "@/hooks/useAppMutation";
import { postDataWithoutRetry } from "@/utils/api";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {}

type ForgotPasswordType = {
  email: string;
};

const ForgotPassword = ({}: Props) => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<ForgotPasswordType>();

  const { error, isLoading, mutate } = useAppMutation({
    mutationFn: (data: ForgotPasswordType) =>
      postDataWithoutRetry("/auth/new-forgot-password-token", data),
    successFn: () => {
      setIsEmailSent(true);
    },
    successMessage: `توضیحات بازیابی رمز عبور به ${getValues(
      "email"
    )} ارسال شد.`,
    invalidateQueryKeys: ["auth"],
  });

  const onSubmit: SubmitHandler<ForgotPasswordType> = async (
    data: ForgotPasswordType,
    e: any
  ) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <PageAuthWrapper>
      <p className="text-center">بازیابی رمز عبور</p>
      {isEmailSent ? (
        <p className="text-center mt-4">
          توضیحات بازیابی رمز عبور به {getValues("email")} ارسال شد.
        </p>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">ایمیل</label>
            <TextInput
              id="email"
              error={"email" in errors}
              {...register("email", {
                required: true,
                maxLength: 128,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </div>
          <Button type="submit">درخواست بازیابی رمز عبور</Button>
        </form>
      )}
    </PageAuthWrapper>
  );
};

export default ForgotPassword;
