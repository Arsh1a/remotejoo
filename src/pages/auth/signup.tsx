import Metadata from "@/components/Common/Metadata";
import Signup from "@/components/PageAuth/Signup";
import useAuthStore from "@/context/useAuthStore";
import useStore from "@/hooks/useStore";
import router from "next/router";
import { useEffect } from "react";

export default function SignupPage() {
  return (
    <>
      <Metadata
        title="عضویت"
        description="عضویت در ریموتجو"
        url="auth/signup"
      />
      <Signup />
    </>
  );
}
