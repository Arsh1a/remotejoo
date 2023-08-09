import React, { useState } from "react";
import Image from "next/image";
import { RiBuilding4Fill } from "react-icons/ri";
import { BsBuilding } from "react-icons/bs";

interface Props {
  companyLogo: string | undefined;
  companyName: string;
  width: number;
  height: number;
}

const defaultLogos = [
  "https://www.e-estekhdam.com/img/company-emt-logo-2.png",
  "https://jobinja.ir/assets/img/logo-placeholder.png",
  "https://fileapi.jobvision.ir/StaticFiles/Employer/DefaultImages/default-companyLogo.png",
];

const CompanyLogo = ({ companyLogo, companyName, width, height }: Props) => {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  const imageExist =
    companyLogo && !imageError && !defaultLogos.includes(companyLogo);

  //For revalidating every time
  const timeStamp = new Date().getTime();

  return (
    <div>
      <Image
        src={
          imageExist
            ? `${companyLogo}?${timeStamp}`
            : "/images/default-company-logo.png"
        }
        alt={companyName}
        height={height}
        width={width}
        unoptimized={imageExist ? false : true}
        className={`rounded-full bg-white max-w-fit`}
        onError={handleImageError}
      />
    </div>
  );
};

export default CompanyLogo;
