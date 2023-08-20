import React, { ButtonHTMLAttributes, ForwardRefRenderFunction } from "react";
import LoadingAnimation from "./LoadingAnimation";

export type ButtonVariant =
  | "primary"
  | "black"
  | "white"
  | "outline"
  | "clean"
  | "red";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref: string;
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
}

const ButtonRenderer: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { children, isLoading, variant = "primary", ...rest },
  ref
) => {
  const variants = {
    primary: "text-white bg-basic",
    black: "text-white bg-black-gradient",
    white: "text-black bg-white",
    red: "text-white bg-red-gradient",
    outline:
      "outline outline-1 text-primary outline-primary bg-white hover:bg-primary hover:text-white",
    clean: "",
  };

  return (
    <button
      {...rest}
      ref={ref}
      className={`${
        variants[variant]
      } disabled:opacity-50 hover:opacity-70 rounded-full whitespace-nowrap relative font-semibold transition py-2 px-4 text-sm${
        rest.className ? ` ${rest.className}` : ""
      }${isLoading ? " opacity-50" : ""}`}
      disabled={isLoading ?? rest.disabled}
    >
      {isLoading ? <>در حال بارگذاری</> : children}
    </button>
  );
};

const Button = React.forwardRef(ButtonRenderer);

export default Button;
