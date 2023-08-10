import Metadata from "@/components/Common/Metadata";
import PageForgotPassword from "@/components/PageAuth/PageForgotPassword";
import useAuthStore from "@/context/useAuthStore";
import useStore from "@/hooks/useStore";
import router from "next/router";
import { useEffect } from "react";

export default function ForgotPasswordPage() {
  return (
    <>
      <Metadata
        title="بازیابی رمز عبور"
        description="بازیابی رمز عبور"
        url="auth/forgot-password"
      />
      <PageForgotPassword />
    </>
  );
}
