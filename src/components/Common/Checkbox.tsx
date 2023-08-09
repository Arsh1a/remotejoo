import React, { InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: () => any;
  checked: boolean;
}

const Checkbox = ({ label, onChange, checked, ...rest }: Props) => {
  return (
    <label className="cursor-pointer flex">
      <input type="checkbox" onChange={onChange} {...rest} />
      <svg
        className={`w-6 h-6 p-1 transition rounded-md inline-block bg-neutral-100${
          checked ? " !bg-primary" : ""
        }`}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <path
          className={`opacity-0 stroke-white transition${
            checked ? " opacity-100" : ""
          }`}
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
        />
      </svg>
      <span className="mr-2">{label}</span>
    </label>
  );
};

export default Checkbox;
