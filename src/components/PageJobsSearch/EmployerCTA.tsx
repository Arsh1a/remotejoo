import React from "react";
import Button from "../Common/Button";
import Link from "next/link";
import useAuthStore from "@/context/useAuthStore";
import useStore from "@/hooks/useStore";

interface Props {}

const EmployerCTA = ({}: Props) => {
  const loggedIn = useStore(useAuthStore, (state) => state.loggedIn);

  return (
    <div className="bg-main hidden md:flex rounded-secondary h-44 text-white flex-col items-center justify-center gap-2 p-6">
      <h3 className="text-3xl font-bold text-center">کارفرما هستید؟</h3>
      <Link href={loggedIn ? "/panel/employer/create" : "/auth/login"}>
        <Button variant="white" className="w-full !font-bold">
          درج آگهی استخدام
        </Button>
      </Link>
    </div>
  );
};

export default EmployerCTA;
