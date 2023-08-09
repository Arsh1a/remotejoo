import React from "react";
import Image from "next/image";

interface Props {
  text?: React.ReactNode;
}

const DataNotFound = ({ text = "موردی یافت نشد." }: Props) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image
        src="/images/not-found.svg"
        alt="Not found"
        height={400}
        width={400}
      />
      <div className="text-xl relative -top-12">{text}</div>
    </div>
  );
};

export default DataNotFound;
