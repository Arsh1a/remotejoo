import React from "react";
import LoadingAnimation from "../Common/LoadingAnimation";
import Button from "../Common/Button";
import Link from "next/link";

interface Props {
  title?: string;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  background?: "white" | "transparent";
  userIsVerified?: boolean;
}

const PanelCard = ({
  title,
  children,
  isLoading,
  className,
  background = "white",
  userIsVerified = true,
}: Props) => {
  return (
    <>
      {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
      {userIsVerified ? (
        <div
          className={`min-h-[50vh] bg-white rounded-primary p-5${
            background === "transparent" ? " !p-0 !bg-transparent" : ""
          }${className ? ` ${className}` : ""}`}
        >
          {isLoading ? (
            <div className="flex w-full items-center relative top-[18vh] justify-center">
              <LoadingAnimation />
            </div>
          ) : (
            children
          )}
        </div>
      ) : (
        <div className="mb-4 flex flex-col items-center justify-center gap-2">
          <p>ابتدا حساب کاربری خود را تأیید کنید.</p>
          <Link href="/panel/settings">
            <Button>تنظیمات</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default PanelCard;
