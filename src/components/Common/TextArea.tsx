import React, { ForwardRefRenderFunction, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref: string;
  error?: boolean;
}

const Input: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
  { error, ...rest },
  ref
) => {
  return (
    <textarea
      {...rest}
      ref={ref}
      className={`px-4 py-2 transition placeholder:text-neutral-400 rounded-secondary ring-1 ring-gray-300 bg-opacity-10 focus:outline focus:outline-2 focus:outline-primary ${
        rest.className ? ` ${rest.className}` : ""
      }${error ? " outline outline-1 outline-red-400" : ""}`}
    />
  );
};

const TextArea = React.forwardRef(Input);

export default TextArea;
