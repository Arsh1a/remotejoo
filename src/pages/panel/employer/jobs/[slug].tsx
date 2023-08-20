import Button from "@/components/Common/Button";
import DataNotFound from "@/components/Common/DataNotFound";
import EmployerResumeCard from "@/components/Common/EmployerResumeCard";
import ErrorMessage from "@/components/Common/ErrorMessage";
import InputError from "@/components/Common/InputError";
import ListBoxDropdown from "@/components/Common/ListBoxDropdown";
import LoadingAnimation from "@/components/Common/LoadingAnimation";
import Metadata from "@/components/Common/Metadata";
import RichTextEditor from "@/components/Common/RichTextEditor";
import SentResumeCard from "@/components/Common/SentResumeCard";
import TextInput from "@/components/Common/TextInput";
import JobForm from "@/components/PagePanel/PagePanelEmployer/JobForm";
import PanelCard from "@/components/PagePanel/PanelCard";
import { categories } from "@/constants/ui.constants";
import {
  InternalJobType,
  JobType,
  SentResumeType,
  CategoryType,
} from "@/types";
import { getData, patchData, postData } from "@/utils/api";
import { removeEmptyFields, toFarsiNumber } from "@/utils/utils";
import { wordifyfa } from "@/utils/wordifyfa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, SetStateAction, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi";

type CreateJobType = {
  title: string;
  categort: CategoryType;
  salary?: string | number;
  description: string;
};

export default function EditJobPage() {
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [loadedJobData, setLoadedJobData] = useState<
    (JobType & InternalJobType) | null
  >(null);
  const [sentResumes, setSentResumes] = useState<SentResumeType[]>([]);

  const router = useRouter();

  const resumesData = useQuery({
    queryKey: ["job-resumes"],
    queryFn: () =>
      getData<{
        resumes: SentResumeType[];
        job: JobType & InternalJobType;
      }>(`/resumes/job/${router.query.slug}`),
    onSuccess: (res) => {
      setLoadedJobData(res.data.job);
      setSentResumes(res.data.resumes);
    },
    enabled: !!router.query.slug,
  });

  return (
    <PanelCard
      background="transparent"
      title={`رزومه های ارسال شده اگهی ${
        loadedJobData?.title ? `"${loadedJobData.title}"` : ""
      }`}
      isLoading={resumesData.isLoading}
    >
      <Metadata
        title={`رزومه های ارسال شده اگهی ${
          loadedJobData?.title ? `"${loadedJobData.title}"` : ""
        }`}
        url={`panel/jobs/${router.query.slug}`}
        description={`رزومه های ارسال شده اگهی ${
          loadedJobData?.title ? `"${loadedJobData.title}"` : ""
        }`}
      />
      <div className="flex flex-col gap-5">
        {sentResumes?.length > 0 ? (
          sentResumes.map((r) => <EmployerResumeCard key={r.id} data={r} />)
        ) : (
          <DataNotFound
            text={
              <div className="flex gap-2 items-center flex-col">
                رزومه ای یافت نشد.
              </div>
            }
          />
        )}
      </div>
    </PanelCard>
  );
}
