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
import Link from "next/link";
import { toast } from "react-hot-toast";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  passFileFn: Dispatch<SetStateAction<string>>;
  passFile: string;
  passLoadingFn: Dispatch<SetStateAction<boolean>>;
  maxFileSize?: number;
  loadedResume: string | null | undefined;
  error?: boolean;
  clearErrors: UseFormClearErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}
const ResumeUpload = ({
  passFileFn,
  passFile,
  passLoadingFn,
  error,
  maxFileSize = 1024 * 1024 * 2,
  loadedResume,
  clearErrors,
  setValue,
  ...rest
}: Props) => {
  const [file, setFile] = useState<File | null | undefined>(null);
  const [dataUri, setDataUri] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (loadedResume) {
      setDataUri(`${process.env.NEXT_PUBLIC_ASSETS_URI}/${loadedResume}`);
    }
  }, [loadedResume]);

  const { mutate, isLoading, data, progress } = useFileUploadMutation(
    passFileFn,
    "path"
  );

  useEffect(() => {
    if (data?.data.success === false) {
      toast.error("مشکلی در آپلود فایل بوجود آمده است.");
    }
  }, [data]);

  useEffect(() => {
    passLoadingFn(isLoading);
    if (isLoading) {
      ref.current!.disabled = true;
    } else {
      ref.current!.disabled = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (!file) {
      return;
    }
    if (file.size > maxFileSize) {
      setErrorMessage("حجم رزومه باید کمتر از 2 مگابایت باشد.");
      setFile(undefined);
      setDataUri("");
      return;
    }
    setErrorMessage("");
    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri as string);
    });
    mutate({ presignedUploadUrl: "/resumes/upload-resume-s3", file });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && !isLoading) {
      setFile(e.target.files[0]);
      //Because we dont directly change file input, we have to manually clear errors from react-hook-form
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
        {isLoading ? (
          <>در حال بارگذاری</>
        ) : (
          <span className="flex justify-center items-center gap-1">
            {file || dataUri ? (
              <div
                className="flex items-center gap-1"
                style={{ direction: "ltr" }}
              >
                {file?.name ? file.name : "رزومه از قبل آپلود شده"}
              </div>
            ) : (
              <>
                <GrFormUpload size={24} />
                آپلود فایل رزومه
              </>
            )}
          </span>
        )}
      </label>
      <input
        ref={ref}
        type="file"
        id="file"
        className="hidden"
        accept=".pdf"
        {...rest}
        onChange={handleFileChange}
      />
      {!isLoading && (
        <>
          {(loadedResume || passFile) && (
            <Link
              href={`${process.env.NEXT_PUBLIC_ASSETS_URI}/${
                loadedResume ?? passFile
              }`}
              className="text-sm hover:opacity-70 transition"
              target="_blank"
              rel="noreferrer"
            >
              مشاهده
            </Link>
          )}
        </>
      )}
      {errorMessage && <InputError message={errorMessage} />}
    </div>
  );
};

export default ResumeUpload;
