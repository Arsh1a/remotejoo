import React from "react";
import Container from "../Common/Container";
import Image from "next/image";

interface Props {}

const JobListingProviders = ({}: Props) => {
  return (
    <Container>
      <div className="flex flex-col gap-10">
        <div className="flex items-center text-center">
          <div className="h-[1px] w-full bg-[radial-gradient(70%_56400%_at_50%_100%,rgba(169,163,194,.24)_0%,rgba(169,163,194,0)_100%)]"></div>
          <h2 className="w-[550px] text-neutral-400 text-sm font-semibold">
            وبسایت های تحت پوشش
          </h2>
          <div className="h-[1px] w-full bg-[radial-gradient(70%_56400%_at_50%_100%,rgba(169,163,194,.24)_0%,rgba(169,163,194,0)_100%)]"></div>
        </div>
        <div className="flex flex-wrap items-center justify-around sm:justify-center gap-6 sm:gap-20">
          <div className="h-[47.55px] w-[130px] sm:h-[69.5px] sm:w-[190px] relative">
            <Image alt="Jobinja" src="/images/jobinja.png" fill />
          </div>
          <div className="h-[49.05px] w-[111px] sm:h-[64.95px] sm:w-[147px] relative">
            <Image alt="Jobvision" src="/images/jobvision.svg" fill />
          </div>
          <div className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] relative">
            <Image alt="E-Estekhdam" src="/images/e-estekhdam.png" fill />
          </div>
          <div className="h-[28px] w-[120px] sm:h-[35px] sm:w-[188px] relative">
            <Image alt="E-Estekhdam" src="/images/quera.svg" fill />
          </div>
        </div>
        <div className="h-[1px] w-full bg-[radial-gradient(70%_56400%_at_50%_100%,rgba(169,163,194,.24)_0%,rgba(169,163,194,0)_100%)]"></div>
      </div>
    </Container>
  );
};

export default JobListingProviders;
