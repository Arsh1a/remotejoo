import Button from "@/components/Common/Button";
import Container from "@/components/Common/Container";
import Logo from "@/components/Common/Logo";
import Metadata from "@/components/Common/Metadata";
import useAppMutation from "@/hooks/useAppMutation";
import { postDataWithoutRetry } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyPage() {
  const router = useRouter();

  const { mutate } = useAppMutation({
    mutationFn: () =>
      postDataWithoutRetry(`/auth/verify/${router.query.token}`, {}),
    successFn: () => {
      router.push("/");
    },
    successMessage: "حساب کاربری با موفقیت تأیید شد.",
    errorFn: () => {
      router.push("/");
    },
  });

  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <Metadata
        title="تأیید حسبا کاربری"
        description="تأیید حسبا کاربری"
        url="auth/verify"
      />
      <div className="flex flex-col items-center justify-center gap-3 p-5 rounded-primary bg-white">
        <Logo className="!text-black" />
        <p>
          با تأیید حساب کاربری می توانید از تمامی امکانات ریموتجو استفاده کنید.
        </p>
        <Button disabled={!router} onClick={() => mutate()}>
          تأیید حساب کاربری
        </Button>
      </div>
    </Container>
  );
}
