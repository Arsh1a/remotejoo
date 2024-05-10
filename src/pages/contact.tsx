import Button from "@/components/Common/Button";
import Container from "@/components/Common/Container";
import InputError from "@/components/Common/InputError";
import Metadata from "@/components/Common/Metadata";
import PanelCard from "@/components/Common/PanelCard";
import TextArea from "@/components/Common/TextArea";
import TextInput from "@/components/Common/TextInput";
import useAppMutation from "@/hooks/useAppMutation";
import { postDataWithoutRetry } from "@/utils/api";
import { BaseSyntheticEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type ContactType = {
  subject: string;
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const { mutate, isLoading } = useAppMutation({
    mutationFn: (data: ContactType) => postDataWithoutRetry("/contact", data),
    successFn: () => {
      reset();
    },
    successMessage:
      "پیام با موفقیت ارسال شد. در اسرع وقت به شما پاسخگو خواهیم بود.",
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (
    data: ContactType,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e!.preventDefault();
    mutate(data);
  };

  return (
    <>
      <Metadata
        title="تماس با ما"
        description={
          "با ریموتجو، فرصت‌های شغلی دورکاری در ایران را در دستان خود داشته باش و به راحتی کار ریموت پیدا کن."
        }
        url={"contact"}
      />
      <Container>
        <PanelCard title="تماس با ما" isLoading={isLoading}>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col flex-1 gap-1">
              <label htmlFor="subject">موضوع</label>
              <TextInput
                id="subject"
                type="text"
                error={"subject" in errors}
                {...register("subject", {
                  required: true,
                  minLength: 3,
                  maxLength: 128,
                })}
              />
              {errors.subject?.type === "required" && (
                <InputError message={"لطفا موضوع را وارد کنید."} />
              )}
              {errors.subject?.type === "minLength" && (
                <InputError
                  message={"موضوع کوتاه تر از 3 حرف نمی تواند باشد."}
                />
              )}
              {errors.subject?.type === "maxLength" && (
                <InputError
                  message={"موضوع بلند تر از 128 حرف نمی تواند باشد."}
                />
              )}
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <label htmlFor="name">نام و نام خانوادگی</label>
              <TextInput
                id="name"
                type="text"
                error={"name" in errors}
                {...register("name", {
                  required: true,
                  minLength: 3,
                  maxLength: 128,
                })}
              />
              {errors.name?.type === "required" && (
                <InputError message={"لطفا نام خود را وارد کنید."} />
              )}
              {errors.name?.type === "minLength" && (
                <InputError message={"نام کوتاه تر از 3 حرف نمی تواند باشد."} />
              )}
              {errors.name?.type === "maxLength" && (
                <InputError
                  message={"نام بلند تر از 128 حرف نمی تواند باشد."}
                />
              )}
            </div>
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
                <InputError
                  message={"ایمیل بلند تر از 128 حرف نمی تواند باشد."}
                />
              )}
              {errors.email?.type === "pattern" && (
                <InputError message={"ایمیل معتبر نمی باشد."} />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message">متن پیام</label>
              <TextArea
                rows={5}
                id="message"
                error={"message" in errors}
                {...register("message", {
                  minLength: 3,
                  maxLength: 1000,
                  required: true,
                })}
              />
              {errors.message?.type === "required" && (
                <InputError message={"لطفا پیام خود را وارد کنید."} />
              )}
              {errors.message?.type === "minLength" && (
                <InputError message={"توضیحات نباید کمتر از 3 کاراکتر باشد."} />
              )}
              {errors.message?.type === "maxLength" && (
                <InputError
                  message={"توضیحات نباید بیشتر از 1000 کاراکتر باشد."}
                />
              )}
            </div>
            <Button className="self-end" type="submit">
              ارسال پیام
            </Button>
          </form>
        </PanelCard>
      </Container>
    </>
  );
}
