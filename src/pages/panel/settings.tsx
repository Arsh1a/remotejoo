import Button from "@/components/Common/Button";
import LoadingAnimation from "@/components/Common/LoadingAnimation";
import TextInput from "@/components/Common/TextInput";
import ChangePassword from "@/components/PagePanel/PagePanelSettings/ChangePassword";
import VerifyEmail from "@/components/PagePanel/PagePanelSettings/VerifyEmail";
import PanelCard from "@/components/PagePanel/PanelCard";
import useSendVerificationEmail from "@/hooks/useSendVerificationEmail";
import { UserType } from "@/types";
import { getData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function SettingsPage() {
  const { isLoading, data: userData } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getData<UserType>("/auth/me"),
    onSuccess: (res) => {},
  });

  return (
    <PanelCard
      title="تنظیمات"
      isLoading={isLoading}
      background="transparent"
      className="flex flex-col md:flex-row md:items-start gap-5 "
    >
      <VerifyEmail data={userData?.data} />
      <ChangePassword />
    </PanelCard>
  );
}
