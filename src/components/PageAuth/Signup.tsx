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
import useAuthStore from "@/context/useAuthStore";
import LoadingAnimation from "../Common/LoadingAnimation";
import PageAuthWrapper from "./PageAuthWrapper";
import InputError from "../Common/InputError";
import { useRouter } from "next/router";

type SignupType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Signup = () => {
  const contextLogin = useAuthStore((state) => state.contextLogin);

  const router = useRouter();

  const queryClient = useQueryClient();
  const { error, isLoading, mutate } = useMutation({
    mutationFn: (data: SignupType) =>
      postDataWithoutRetry("/auth/signup", data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      contextLogin();
      router.back();
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupType>();

  const onSubmit: SubmitHandler<SignupType> = async (
    data: SignupType,
    e: any
  ) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <PageAuthWrapper>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="first-name">نام</label>
          <TextInput
            id="first-name"
            error={"firstName" in errors}
            {...register("firstName", {
              required: true,
              maxLength: 128,
            })}
          />
          {errors.firstName?.type === "required" && (
            <InputError message={"لطفا نام خود را وارد کنید."} />
          )}
          {errors.firstName?.type === "maxLength" && (
            <InputError message={"نام بلند تر از 128 حرف نمی تواند باشد."} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="last-name">نام خانوادگی</label>
          <TextInput
            id="last-name"
            error={"lastName" in errors}
            {...register("lastName", { required: true, maxLength: 128 })}
          />
          {errors.lastName?.type === "required" && (
            <InputError message={"لطفا نام خانوادگی خود را وارد کنید."} />
          )}
          {errors.lastName?.type === "maxLength" && (
            <InputError
              message={"نام خانوادگی بلند تر از 128 حرف نمی تواند باشد."}
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">ایمیل شخصی یا ایمیل سازمانی</label>
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
        <Button className="mt-4">ثبت نام</Button>
        <ErrorMessage error={error} />
        {isLoading && (
          <div className="flex justify-center items-center">
            <LoadingAnimation />
          </div>
        )}
      </form>
    </PageAuthWrapper>
  );
};

export default Signup;
