import { JobType } from "@/types";
import Container from "../Common/Container";
import Button from "../Common/Button";
import Link from "next/link";
import JobCard from "../Common/JobCard";
import JobCardAlternative from "../Common/JobCardAlternative";

interface Props {
  data: JobType[];
}

const LatestJobs = ({ data }: Props) => {
  return (
    <Container className="mb-5">
      <h1 className="text-2xl font-semibold mb-8">
        جدیدترین فرصت های شغلی دورکاری
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {data && data.map((job, i) => <JobCardAlternative key={i} {...job} />)}
      </div>
      <div className="flex items-center justify-center">
        <Link href="/jobs" className="mt-4 md:mt-8">
          <Button variant="primary">مشاهده همه</Button>
        </Link>
      </div>
    </Container>
  );
};

export default LatestJobs;
