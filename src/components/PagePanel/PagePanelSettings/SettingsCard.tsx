import LoadingAnimation from "@/components/Common/LoadingAnimation";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  title: string;
  isLoading?: boolean;
}

const SettingsCard = ({ children, title, className, isLoading }: Props) => {
  return (
    <div
      className={`bg-white p-5 rounded-secondary flex flex-col gap-2 flex-1 relative${
        className ? ` ${className}` : ""
      }`}
    >
      <h5 className="font-bold">{title}</h5>
      {children}
      {isLoading && (
        <div className="absolute w-full h-full right-0 rounded-secondary bg-white bg-opacity-90 flex items-center justify-center">
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
};

export default SettingsCard;
