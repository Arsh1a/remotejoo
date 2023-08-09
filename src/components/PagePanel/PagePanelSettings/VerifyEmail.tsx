import Button from "@/components/Common/Button";
import LoadingAnimation from "@/components/Common/LoadingAnimation";
import TextInput from "@/components/Common/TextInput";
import useSendVerificationEmail from "@/hooks/useSendVerificationEmail";
import { UserType } from "@/types";
import React from "react";
import SettingsCard from "./SettingsCard";

interface Props {
  data: UserType | undefined;
}

const VerifyEmail = ({ data }: Props) => {
  const {
    isLoading: verificationEmailIsLoading,
    mutate: verificationEmailMutate,
  } = useSendVerificationEmail();

  return (
    <SettingsCard title="آدرس ایمیل">
      <div className="flex gap-2 flex-wrap">
        <TextInput value={data?.email} disabled />
        <Button
          disabled={data?.isVerified}
          onClick={() => verificationEmailMutate()}
        >
          {data?.isVerified
            ? "حساب کاربری تأیید شده است"
            : "ارسال کد تأیید حساب کاربری"}
        </Button>
        {verificationEmailIsLoading && <LoadingAnimation />}
      </div>
    </SettingsCard>
  );
};

export default VerifyEmail;
