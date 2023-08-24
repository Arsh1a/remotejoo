import {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { GrFormUpload } from "react-icons/gr";
import Image from "next/image";
import { fileToDataUri } from "@/utils/utils";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postData } from "@/utils/api";
import useFileUploadMutation from "@/hooks/useFileUploadMutation";
import {
  FieldValues,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import InputError from "../Common/InputError";

//TODO: This reusable component does not work well. Fix first before replacing with non-reusable components.

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  passFileFn: Dispatch<SetStateAction<string>>;
  passLoadingFn: Dispatch<SetStateAction<boolean>>;
  maxFileSize?: number;
  loadedFile: string | null | undefined;
  error?: boolean;
  clearErrors: UseFormClearErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  fileUploadUrl: string;
  fileType: string;
}
const FileUpload = ({
  passFileFn,
  passLoadingFn,
  error,
  maxFileSize = 1024 * 1024 * 2,
  loadedFile,
  clearErrors,
  setValue,
  fileUploadUrl,
  fileType,
  ...rest
}: Props) => {
  const [file, setFile] = useState<File | null | undefined>(null);
  const [dataUri, setDataUri] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (loadedFile) {
      setDataUri(`${process.env.NEXT_PUBLIC_ASSETS_URI}/${loadedFile}`);
    }
  }, [loadedFile]);

  const { mutate, isLoading, data, progress } = useFileUploadMutation(
    passFileFn,
    "path"
  );

  useEffect(() => {
    passLoadingFn(isLoading);
    if (isLoading) {
      ref.current!.disabled = true;
    } else {
      ref.current!.disabled = false;
    }
  }, [isLoading]);

  useEffect(() => {
    if (!file) {
      return;
    }
    if (file.size > maxFileSize) {
      setErrorMessage("File size should be less than 2MB.");
      setFile(undefined);
      setDataUri("");
      return;
    }
    setErrorMessage("");
    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri as string);
    });
    mutate({ presignedUploadUrl: fileUploadUrl, file });
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && !isLoading) {
      setFile(e.target.files[0]);
      clearErrors("file");
      setValue("file", "value");
    }
  };

  const removeFile = () => {
    if (!ref.current) return;
    ref.current.value = "";
    setFile(null);
    setDataUri("");
    passFileFn("");
    setValue("file", "");
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        className={`overflow-hidden relative text-center cursor-pointer px-4 py-2 transition rounded-secondary ring-1 ring-gray-300 bg-opacity-10 hover:ring-primary hover:ring-2 focus:outline focus:outline-2 focus:outline-primary${
          errorMessage || error ? " ring-red-500" : ""
        }${isLoading ? " cursor-progress opacity-70" : ""}`}
        htmlFor="file"
      >
        <span className="flex justify-center items-center gap-1">
          {file || dataUri ? (
            <div
              className="flex items-center gap-1"
              style={{ direction: "ltr" }}
            >
              {file?.name ? file.name : "Previously uploaded file"}
            </div>
          ) : (
            <>
              <GrFormUpload size={24} />
              Upload file
            </>
          )}
        </span>
        {file && (
          <div
            className={`h-1 right-0 bg-secondary w-full absolute bottom-0 transition-[width,opacity]`}
            style={{ width: `${progress}%` }}
          ></div>
        )}
      </label>
      <input
        ref={ref}
        type="file"
        id="file"
        className="hidden"
        accept={fileType}
        {...rest}
        onChange={handleFileChange}
      />
      {dataUri && (
        <a
          href={dataUri}
          className="text-sm hover:opacity-70 transition"
          target="_blank"
          rel="noreferrer"
        >
          View
        </a>
      )}
      {errorMessage && <InputError message={errorMessage} />}
    </div>
  );
};

export default FileUpload;
