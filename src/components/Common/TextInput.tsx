import React, {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  ref: string;
  error?: boolean;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { error, ...rest },
  ref
) => {
  return (
    <input
      type="text"
      {...rest}
      ref={ref}
      className={`px-4 py-2 transition placeholder:text-neutral-400 rounded-secondary ring-1 ring-gray-300 bg-opacity-10 focus:outline focus:outline-2 focus:outline-primary ${
        rest.className ? ` ${rest.className}` : ""
      }${error ? " outline outline-1 outline-red-400" : ""}`}
    />
  );
};

const TextInput = React.forwardRef(Input);

export default TextInput;
