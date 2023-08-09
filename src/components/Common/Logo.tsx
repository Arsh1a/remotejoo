import React, { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {}

const Logo = ({ ...rest }: Props) => {
  return (
    <h1
      className={`text-white text-3xl font-bold flex after:content-[''] after:h-[13px] after:w-[13px] after:rounded-full after:bg-main-orange after:absolute after:-left-3 after:block relative${
        rest.className ? ` ${rest.className}` : ""
      }`}
    >
      ریموتجو
    </h1>
  );
};

export default Logo;
