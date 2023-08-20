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
import InputError from "../../Common/InputError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postData } from "@/utils/api";
import useFileUploadMutation from "@/hooks/useFileUploadMutation";
import {
  FieldValues,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  passFileFn: Dispatch<SetStateAction<string>>;
  passLoadingFn: Dispatch<SetStateAction<boolean>>;
  maxFileSize?: number;
  loadedCompanyImage: string | null | undefined;
  error?: boolean;
  clearErrors: UseFormClearErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}
const CompanyImageUpload = ({
  passFileFn,
  passLoadingFn,
  error,
  maxFileSize = 1024 * 1024 * 1,
  loadedCompanyImage,
  clearErrors,
  setValue,
  ...rest
}: Props) => {
  const [file, setFile] = useState<File | null | undefined>(null);
  const [dataUri, setDataUri] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (loadedCompanyImage) {
      setDataUri(`${process.env.NEXT_PUBLIC_IMAGES_URI}/${loadedCompanyImage}`);
    }
  }, [loadedCompanyImage]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (!file) {
      return;
    }
    if (file.size > maxFileSize) {
      setErrorMessage("حجم عکس باید کمتر از 1 مگابایت باشد.");
      setFile(undefined);
      setDataUri("");
      return;
    }
    setErrorMessage("");
    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri as string);
    });
    mutate({ presignedUploadUrl: "/companies/upload-image-s3", file });
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
                {file?.name ? file.name : "لوگو کنونی شرکت"}

                {dataUri && (
                  //To stop from caching image cause this is a image that changes a LOT
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={dataUri}
                    className="rounded-full"
                    alt="لوگو شرکت"
                    height={40}
                    width={40}
                  />
                )}
              </div>
            ) : (
              <>
                <GrFormUpload size={24} />
                آپلود فایل لوگو
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
        accept=".png,.jpeg,.jpg"
        {...rest}
        onChange={handleFileChange}
      />
      {errorMessage && <InputError message={errorMessage} />}
      {dataUri && file && (
        <span
          onClick={removeFile}
          className="text-sm flex self-start gap-1 items-center text-red-500 cursor-pointer hover:opacity-70 transition"
        >
          <MdDelete />
          حذف لوگو
        </span>
      )}
    </div>
  );
};

export default CompanyImageUpload;
