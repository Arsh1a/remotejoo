import { postData, postDataWithoutRetry } from "@/utils/api";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Common/Button";
import ErrorMessage from "../Common/ErrorMessage";
import TextInput from "../Common/TextInput";
import InputError from "../Common/InputError";
import Link from "next/link";
import useAuthStore from "@/context/useAuthStore";
import LoadingAnimation from "../Common/LoadingAnimation";
import PageAuthWrapper from "./PageAuthWrapper";
import { useRouter } from "next/router";
import useAppMutation from "@/hooks/useAppMutation";

type LoginType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Login = () => {
  const contextLogin = useAuthStore((state) => state.contextLogin);

  const router = useRouter();

  const { error, data, isLoading, mutate } = useAppMutation({
    mutationFn: (data: LoginType) => postDataWithoutRetry("/auth/login", data),
    onSuccess: async (res) => {
      contextLogin();
      router.back();
    },
    invalidateQueryKeys: ["auth"],
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginType>();

  const onSubmit: SubmitHandler<LoginType> = async (
    data: LoginType,
    e: any
  ) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <PageAuthWrapper>
      <p className="text-center">ورود</p>
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
          {errors.email?.type === "required" && (
            <InputError message={"لطفا ایمیل خود را وارد کنید."} />
          )}
          {errors.email?.type === "maxLength" && (
            <InputError message={"ایمیل بلند تر از 128 حرف نمی تواند باشد."} />
          )}
          {errors.email?.type === "pattern" && (
            <InputError message={"ایمیل معتبر نمی باشد."} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">رمز عبور</label>
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
          {errors.password?.type === "required" && (
            <InputError message={"لطفا رمز عبور خود را وارد کنید."} />
          )}
          {errors.password?.type === "minLength" && (
            <InputError message={"رمز عبور حداقل باید 8 کاراکتر باشد."} />
          )}
          {errors.password?.type === "maxLength" && (
            <InputError
              message={"رمز عبور بیشتر از 128 کاراکتر نمی تواند باشد."}
            />
          )}
        </div>
        <Link
          href="/auth/forgot-password"
          className="opacity-50 text-sm transition hover:opacity-100"
        >
          رمز عبور خود را فراموش کرده‌اید؟
        </Link>
        <Button isLoading={isLoading}>ورود</Button>
        <ErrorMessage error={error} />
      </form>
    </PageAuthWrapper>
  );
};

export default Login;
