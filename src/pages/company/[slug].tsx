import CompanyLogo from "@/components/Common/CompanyLogo";
import Container from "@/components/Common/Container";
import JobCardAlternative from "@/components/Common/JobCardAlternative";
import PageJobsWrapper from "@/components/PageJobs/PageJobsWrapper";
import { CompanyType, InternalJobType, JobType } from "@/types";
import { SSRFetcher } from "@/utils/api";
import { toFarsiNumber } from "@/utils/utils";
import { GetServerSideProps } from "next";

//Same as index, Made this for having user friendly url
export default function CompanyPage({
  companyData,
  companyJobsData,
}: {
  companyData: CompanyType;
  companyJobsData: JobType[];
}) {
  return (
    <Container className="flex flex-col gap-5">
      <section className="bg-white flex flex-col gap-10 rounded-primary p-6">
        <div className="flex gap-5">
          <CompanyLogo
            companyLogo={`${process.env.NEXT_PUBLIC_IMAGES_URI}/${companyData.logo}`}
            companyName={companyData.name}
            height={80}
            width={80}
          />
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold">{companyData.name}</h2>
            {companyData.website && (
              <a
                className="hover:opacity-70 transition"
                href={companyData.website}
              >
                {companyData.website}
              </a>
            )}
            {/* <span className="text-sm">
              تعداد آگهی منتشر کرده: {toFarsiNumber(data.jobsPostedCount)}
            </span> */}
          </div>
        </div>
      </section>
      <section className="flex flex-col bg-white rounded-primary p-6">
        <h3 className="text-xl font-bold">معرفی شرکت</h3>
        <p className="w-full break-words whitespace-pre-wrap">
          {companyData.description ?? <>این شرکت توضیحاتی ندارد. 😔</>}
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {companyJobsData.map((j) => (
          <JobCardAlternative key={j.id} {...j} />
        ))}
      </section>
    </Container>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const companyResponse = await SSRFetcher(`/companies/${params!.slug}`);
  const companyJobsResponse = await SSRFetcher(`/jobs/company/${params!.slug}`);

  if (!companyResponse) {
    return { notFound: true };
  }

  return {
    props: {
      companyData: companyResponse,
      companyJobsData: companyJobsResponse,
    },
  };
};
