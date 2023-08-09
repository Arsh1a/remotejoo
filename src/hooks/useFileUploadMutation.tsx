import { axiosInstance } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useState } from "react";

interface Args {
  presignedUploadUrl: string;
  file: File;
}

const useFileUploadMutation = (
  successDispatchFn?: Dispatch<SetStateAction<string>>,
  successDispatchFnProperty?: string
) => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation<AxiosResponse, AxiosError, Args>({
    mutationFn: (args) => {
      const form = new FormData();
      form.append("file", args.file);
      return axiosInstance.post(args.presignedUploadUrl, form, {
        onUploadProgress: (ev) =>
          setProgress(Math.round((ev.loaded * 100) / ev.total!)),
      });
    },
    onSuccess: (res) => {
      if (successDispatchFn)
        successDispatchFn(
          successDispatchFnProperty
            ? res.data[successDispatchFnProperty]
            : res.data
        );
    },
  });

  return { ...mutation, progress };
};

export default useFileUploadMutation;
