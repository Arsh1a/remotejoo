import React from "react";
import Button from "../Common/Button";
import TextInput from "../Common/TextInput";
import PageAuthWrapper from "./PageAuthWrapper";

interface Props {}

const PageForgotPassword = ({}: Props) => {
  return (
    <PageAuthWrapper>
      <p className="text-center">بازیابی رمز عبور</p>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">ایمیل</label>
          <TextInput type="email" id="email" name="email" />
        </div>
        <Button>درخواست بازیابی رمز عبور</Button>
      </form>
    </PageAuthWrapper>
  );
};

export default PageForgotPassword;
