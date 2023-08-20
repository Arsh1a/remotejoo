import React from "react";
import Button from "../Common/Button";
import Link from "next/link";

interface Props {}

const EmployerCTA = ({}: Props) => {
  return (
    <div className="bg-main hidden md:flex rounded-secondary h-44 text-white flex-col items-center justify-center gap-2 p-6">
      <h3 className="text-3xl font-bold text-center">کارفرما هستید؟</h3>
      <Link href="/panel/employer/create">
        <Button variant="white" className="w-full !font-bold">
          درج آگهی استخدام
        </Button>
      </Link>
    </div>
  );
};

export default EmployerCTA;
