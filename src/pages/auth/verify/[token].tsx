import Button from "@/components/Common/Button";
import Container from "@/components/Common/Container";
import Logo from "@/components/Common/Logo";
import { postDataWithoutRetry } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyPage() {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: () =>
      postDataWithoutRetry(`/auth/verify/${router.query.token}`, {}),
    onSuccess: (res) => {
      toast.success("حساب کاربری با موفقیت تایید شد.");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
      router.push("/");
    },
  });

  return (
    <Container className="flex h-screen flex-col items-center justify-center">
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
