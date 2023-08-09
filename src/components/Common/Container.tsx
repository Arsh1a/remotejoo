import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <section
      className={`px-4 py-6 mx-auto max-w-[1200px]${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </section>
  );
};

export default Container;
