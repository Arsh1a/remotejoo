import React, { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

const Card = ({ children, ...rest }: Props) => {
  return (
    <div
      {...rest}
      className={`bg-white rounded-secondary py-4 px-5${
        rest.className ? ` ${rest.className}` : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
