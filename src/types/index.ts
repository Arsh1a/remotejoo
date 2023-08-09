import {
  jobStatusLabels,
  origins,
  sentResumeStatusLabels,
  tags,
} from "@/constants/ui.constants";

export type UserType = {
  lastName: string;
  firstName: string;
  email: string;
  uploadedResume: null | string;
  isVerified: boolean;
  company: CompanyType[];
  sentResumes: SentResumeType[];
};

export type ResumeType = {
  id: string;
  createdAt: string;
  phoneNumber: string;
  resumePdf: string;
  status: SentResumesStatusType;
  name: string;
  description?: string;
  userId: string;
  jobId: string;
};

export type SentResumeType = ResumeType & {
  job: JobType & InternalJobType;
  company: CompanyType;
};

export type SentResumesStatusType = keyof typeof sentResumeStatusLabels;

export type JobType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  passedDays: number;
  tag: TagType;
  salary?: number;
} & (InternalJobType | ExternalJobType);

export type InternalJobType = {
  origin: InternalOriginType;
  company: CompanyType;
  slug: string;
  description: string;
  status: InternalJobStatusType;
  publishedAt: string;
};

export type InternalJobStatusType = keyof typeof jobStatusLabels;

export type ExternalJobType = {
  companyName: string;
  companyLogo?: string;
  origin: ExternalOriginType;
  link: string;
};

export type CompanyType = {
  id: string;
  createdAt: string;
  name: string;
  jobsPostedCount: number;
  logo?: string;
  website?: string;
  description?: string;
  slug: string;
  job: JobType[];
};

export type TagType = keyof typeof tags;

export type OriginType = keyof typeof origins;
export type InternalOriginType = Extract<OriginType, "remotejoo">;
export type ExternalOriginType = Exclude<OriginType, "remotejoo">;

export type FilterType = {
  page?: number;
  limit?: number;
  text?: string;
  tags?: TagType[] | string;
};

export type JobFetchType = {
  jobs: JobType[];
  totalJobs: number;
  totalPages: number;
};
