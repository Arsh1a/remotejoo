import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  error: unknown | string;
}

const ErrorMessage = ({ error }: Props) => {
  const [message, setMessage] = useState(
    typeof error === "string" || error instanceof String ? error : ""
  );
  useEffect(() => {
    if (typeof error !== "string") {
      setMessage("");
      if (error instanceof AxiosError) {
        setMessage(error.response?.data.message);
      }
    } else {
      setMessage(error);
    }
  }, [error]);

  if (!message) {
    return <></>;
  }
  return (
    <div className="bg-red-500 outline outline-1 rounded-xl py-2 px-4 text-white">
      {message}
    </div>
  );
};

export default ErrorMessage;
